import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { supabase } from "@/utils/supabase";
import { useAuth } from "@/contexts/AuthContext";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  message_text: string;
  created_at: string;
}

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
  otherUserId: string;
}

const ashdenId = "49424b96-fad7-486c-9a70-47bec3476390"; // Ashden Mascarenhas (Buyer)
const jayId = "dc6ee612-610f-41a4-875c-9bbfcad933c0"; // Jay (Seller)

export default function Messages() {
  const { t } = useLanguage();
  const { user } = useAuth(); // Get current user from AuthContext
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState("");
  const [allMessages, setAllMessages] = useState<Message[]>([]);

  const currentUserId = user?.id; // Use actual logged-in user ID

  // Determine other user based on currentUserId
  const otherUserId = currentUserId === ashdenId ? jayId : ashdenId;
  const otherUserName = currentUserId === ashdenId ? "Jay" : "Ashden Mascarenhas";

  useEffect(() => {
    if (!currentUserId) return; // Wait for user to be loaded

    setSelectedConversation({
      id: "ashden-jay-chat", // A fixed ID for this specific conversation
      name: otherUserName,
      lastMessage: "",
      timestamp: "",
      unread: 0,
      avatar: "",
      otherUserId: otherUserId,
    });
  }, [currentUserId, otherUserId, otherUserName]);

  useEffect(() => {
    if (!selectedConversation || !currentUserId || !otherUserId) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(`and(sender_id.eq.${currentUserId},receiver_id.eq.${otherUserId}),and(sender_id.eq.${otherUserId},receiver_id.eq.${currentUserId})`)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setAllMessages(data || []);
      }
    };

    fetchMessages();
  }, [selectedConversation, currentUserId, otherUserId]);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedConversation || !currentUserId) return;

    const { data, error } = await supabase.from("messages").insert([
      {
        sender_id: currentUserId,
        receiver_id: otherUserId,
        message_text: messageText,
      },
    ]).select();

    if (error) {
      console.error("Error sending message:", error);
    } else if (data) {
      setAllMessages((prev) => [...prev, data[0]]);
      setMessageText("");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-4xl font-bold" data-testid="heading-messages">
          {t("messages")}
        </h1>
        <p className="text-muted-foreground mt-2">
          Chat with buyers and sellers
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search conversations..."
                className="pl-9"
                data-testid="input-search-conversations"
              />
            </div>
          </CardHeader>
          <ScrollArea className="h-[600px]">
            <div className="space-y-1 p-4 pt-0">
              {selectedConversation && (
                <button
                  key={selectedConversation.id}
                  onClick={() => setSelectedConversation(selectedConversation)}
                  className={cn(
                    "flex w-full items-start gap-3 rounded-md p-3 text-left transition-colors hover-elevate active-elevate-2",
                    true && "bg-accent" // Always selected for the dynamically determined conversation
                  )}
                  data-testid={`conversation-${selectedConversation.id}`}
                >
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedConversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <p className="font-semibold truncate">{selectedConversation.name}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{selectedConversation.lastMessage}</p>
                    <p className="text-xs text-muted-foreground mt-1">{selectedConversation.timestamp}</p>
                  </div>
                </button>
              )}
            </div>
          </ScrollArea>
        </Card>

        <Card className="lg:col-span-2">
          {selectedConversation ? (
            <>
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={selectedConversation.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {selectedConversation.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold" data-testid="text-conversation-name">
                      {selectedConversation.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
              </CardHeader>
              <ScrollArea className="h-[450px]">
                <div className="p-6 space-y-4">
                  {allMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender_id === currentUserId ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender_id === currentUserId
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.message_text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender_id === currentUserId ? "text-primary-foreground/80" : "text-muted-foreground"
                          }`}
                        >
                          {new Date(message.created_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <CardContent className="border-t border-border pt-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    data-testid="input-message"
                  />
                  <Button onClick={handleSendMessage} data-testid="button-send-message">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </>
          ) : (
            <CardContent className="flex flex-col items-center justify-center h-[600px]">
              <div className="text-center space-y-3">
                <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-muted">
                  <Send className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg">Select a conversation</h3>
                <p className="text-muted-foreground max-w-sm">
                  Choose a conversation from the list to start chatting with buyers or sellers
                </p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
}


