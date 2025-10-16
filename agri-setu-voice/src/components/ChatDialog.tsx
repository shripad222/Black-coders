import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface ChatDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    farmerName: string;
    cropName: string;
}

interface Message {
    id: number;
    sender: "me" | "farmer";
    text: string;
    time: string;
}

const ChatDialog = ({ open, onOpenChange, farmerName, cropName }: ChatDialogProps) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "farmer",
            text: `Hello! What information do you need about ${cropName}?`,
            time: "10:30 AM",
        },
    ]);
    const [newMessage, setNewMessage] = useState("");

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const message: Message = {
            id: messages.length + 1,
            sender: "me",
            text: newMessage,
            time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages([...messages, message]);
        setNewMessage("");

        // Simulate farmer response
        setTimeout(() => {
            const response: Message = {
                id: messages.length + 2,
                sender: "farmer",
                text: "Thank you! I will respond shortly.",
                time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
            };
            setMessages((prev) => [...prev, response]);
        }, 1000);
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
                                className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                                        message.sender === "me"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-muted"
                                    }`}
                                >
                                    <p className="text-sm">{message.text}</p>
                                    <p
                                        className={`text-xs mt-1 ${
                                            message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                                        }`}
                                    >
                                        {message.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="p-4 border-t">
                    <div className="flex gap-2">
                        <Input
                            placeholder="Type a message..."
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