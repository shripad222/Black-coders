from fastapi import FastAPI
from pydantic import BaseModel
import torch
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
from IndicTransToolkit.processor import IndicProcessor

app = FastAPI(title="IndicTrans2 Translation API", version="1.0")

# ✅ Language mapping (short code to Flores-200 format)
LANG_MAP = {
    "hi": "hin_Deva",
    "ta": "tam_Taml",
    "te": "tel_Telu",
    "bn": "ben_Beng",
    "ml": "mal_Mlym",
    "kok": "gom_Deva",  # Konkani
    "mr": "mar_Deva",   # Marathi
    "gu": "guj_Gujr",   # Gujarati
    "kn": "kan_Knda",   # Kannada
    "pa": "pan_Guru",   # Punjabi
    "or": "ory_Orya"    # Odia
}

SUPPORTED_LANGS = list(LANG_MAP.keys())

# ✅ Initialize model and tokenizer
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"
model_name = "ai4bharat/indictrans2-en-indic-1B"

print(f"Loading IndicTrans2 model on {DEVICE}...")
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModelForSeq2SeqLM.from_pretrained(
    model_name,
    trust_remote_code=True,
    torch_dtype=torch.float16 if DEVICE == "cuda" else torch.float32
).to(DEVICE)

# ✅ Initialize IndicProcessor
ip = IndicProcessor(inference=True)
print("✅ IndicTrans2 model loaded successfully")

# ✅ Request schema
class TranslationRequest(BaseModel):
    text: str
    target_lang: str  # "hi", "ta", "te", "bn", "ml"

@app.post("/translate")
def translate_text(req: TranslationRequest):
    input_text = req.text.strip()
    target_lang = req.target_lang.lower()

    if not input_text:
        return {"error": "Text cannot be empty"}
    if target_lang not in SUPPORTED_LANGS:
        return {"error": f"Unsupported target language: {target_lang}. Supported: {SUPPORTED_LANGS}"}

    try:
        src_lang = "eng_Latn"
        tgt_lang = LANG_MAP[target_lang]
        
        # ✅ Preprocess the input using IndicProcessor
        batch = ip.preprocess_batch(
            [input_text],
            src_lang=src_lang,
            tgt_lang=tgt_lang
        )
        
        # Debug: Check if preprocessing worked
        if not batch or batch[0] is None:
            return {"error": f"Preprocessing failed. Check IndicProcessor installation."}
        
        print(f"Preprocessed batch: {batch}")
        
        # ✅ Tokenize
        inputs = tokenizer(
            batch,
            truncation=True,
            padding="longest",
            return_tensors="pt",
            return_attention_mask=True
        ).to(DEVICE)
        
        print(f"Tokenized inputs shape: {inputs['input_ids'].shape}")
        
        # ✅ Generate translation
        with torch.no_grad():
            generated_tokens = model.generate(
                **inputs,
                use_cache=False,  # Set to False to avoid cache-related errors
                min_length=0,
                max_length=256,
                num_beams=5,
                num_return_sequences=1
            )
        
        # ✅ Decode (without as_target_tokenizer context)
        generated_tokens = tokenizer.batch_decode(
            generated_tokens,
            skip_special_tokens=True,
            clean_up_tokenization_spaces=True
        )
        
        print(f"Decoded tokens: {generated_tokens}")
        
        # ✅ Postprocess
        translations = ip.postprocess_batch(generated_tokens, lang=tgt_lang)
        
        return {"translated_text": translations[0]}

    except Exception as e:
        import traceback
        error_details = traceback.format_exc()
        print(f"Error details:\n{error_details}")
        return {"error": f"Translation failed: {str(e)}"}

@app.get("/")
def root():
    return {"message": "IndicTrans2 Translation API running 🚀"}


#hello world literally this file is there but its not showing, its showing my vscode
