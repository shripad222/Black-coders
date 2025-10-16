import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Message } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  avatar?: string;
}

export default function Messages() {
  const { t } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState("");

  const { data: conversations, isLoading: conversationsLoading } = useQuery<Conversation[]>({
    queryKey: ["/api/conversations"],
  });

  const { data: messages, isLoading: messagesLoading } = useQuery<Message[]>({
    queryKey: ["/api/messages", selectedConversation],
    enabled: !!selectedConversation,
  });

  const mockConversations: Conversation[] = [
    {
      id: "1",
      name: "Amit Singh",
      lastMessage: "I'm interested in your wheat listing",
      timestamp: "2 min ago",
      unread: 2,
    },
    {
      id: "2",
      name: "Priya Patel",
      lastMessage: "Can we negotiate the price?",
      timestamp: "1 hour ago",
      unread: 0,
    },
    {
      id: "3",
      name: "Rajesh Wholesale",
      lastMessage: "When can you deliver?",
      timestamp: "3 hours ago",
      unread: 1,
    },
  ];

  const displayConversations = conversations || mockConversations;

  const currentConversation = displayConversations.find(c => c.id === selectedConversation);

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    setMessageText("");
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
              {conversationsLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-full" />
                    </div>
                  </div>
                ))
              ) : (
                displayConversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={cn(
                      "flex w-full items-start gap-3 rounded-md p-3 text-left transition-colors hover-elevate active-elevate-2",
                      selectedConversation === conv.id && "bg-accent"
                    )}
                    data-testid={`conversation-${conv.id}`}
                  >
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conv.avatar} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {conv.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <p className="font-semibold truncate">{conv.name}</p>
                        {conv.unread > 0 && (
                          <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-primary-foreground">
                            {conv.unread}
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-muted-foreground mt-1">{conv.timestamp}</p>
                    </div>
                  </button>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>

        <Card className="lg:col-span-2">
          {selectedConversation && currentConversation ? (
            <>
              <CardHeader className="border-b border-border">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={currentConversation.avatar} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {currentConversation.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold" data-testid="text-conversation-name">
                      {currentConversation.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">Online</p>
                  </div>
                </div>
              </CardHeader>
              <ScrollArea className="h-[450px]">
                <div className="p-6 space-y-4">
                  {messagesLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className={cn("flex", i % 2 === 0 ? "justify-start" : "justify-end")}>
                        <Skeleton className="h-16 w-64 rounded-lg" />
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="flex justify-start">
                        <div className="max-w-[70%] rounded-lg bg-muted p-3" data-testid="message-received">
                          <p className="text-sm">I'm interested in your wheat listing. What's your best price for 50 quintals?</p>
                          <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <div className="max-w-[70%] rounded-lg bg-primary text-primary-foreground p-3" data-testid="message-sent">
                          <p className="text-sm">Thank you for your interest! For 50 quintals, I can offer ₹2,850 per quintal.</p>
                          <p className="text-xs text-primary-foreground/80 mt-1">10:35 AM</p>
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="max-w-[70%] rounded-lg bg-muted p-3">
                          <p className="text-sm">That's a good price. Can we meet tomorrow to finalize?</p>
                          <p className="text-xs text-muted-foreground mt-1">10:38 AM</p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </ScrollArea>
              <CardContent className="border-t border-border pt-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
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
