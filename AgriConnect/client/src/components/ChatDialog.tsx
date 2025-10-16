import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { supabase } from "@/utils/supabase";

interface ChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  farmerName: string;
  cropName: string;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  created_at: string;
}

const ashdenId = "49424b96-fad7-486c-9a70-47bec3476390"; // Ashden Mascarenhas (Buyer)
const jayId = "dc6ee612-610f-41a4-875c-9bbfcad933c0"; // Jay (Seller)

const ChatDialog = ({ open, onOpenChange, farmerName, cropName }: ChatDialogProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const currentUserId = ashdenId; // For now, assume Ashden is the current user

  useEffect(() => {
    if (!open) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${jayId}),and(sender_id.eq.${jayId},receiver_id.eq.${currentUserId})`)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages();
  }, [open, currentUserId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const { data, error } = await supabase.from("messages").insert([
      {
        sender_id: currentUserId,
        receiver_id: jayId,
        message_text: newMessage,
      },
    ]).select();

    if (error) {
      console.error("Error sending message:", error);
    } else if (data) {
      setMessages((prev) => [...prev, data[0]]);
      setNewMessage("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                {farmerName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle>{farmerName}</DialogTitle>
              <p className="text-sm text-muted-foreground">{cropName}</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    message.sender_id === currentUserId
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  <p className="text-sm">{message.message_text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.sender_id === currentUserId ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {new Date(message.created_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              placeholder="Type message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatDialog;