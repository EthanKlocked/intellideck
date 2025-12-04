"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { chat } from "./actions";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string | ReactNode;
}

export function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // 이벤트 위임: streamUI에서 반환된 버튼 클릭 처리
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const action = target.dataset.action;

      if (action === "alert") {
        const message = target.dataset.message || "클릭됨!";
        alert(message);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chat(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "죄송합니다. 오류가 발생했습니다. 다시 시도해주세요.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      <header className="border-b p-4">
        <h1 className="text-xl font-semibold">IntelliDeck AI</h1>
        <p className="text-sm text-muted-foreground">AI 어시스턴트와 대화하세요</p>
      </header>

      <ScrollArea className="flex-1">
        <div className="space-y-4 p-4">
          {messages.length === 0 && (
            <div className="py-8 text-center text-muted-foreground">
              <Bot className="mx-auto mb-4 h-12 w-12 opacity-50" />
              <p>안녕하세요! 무엇을 도와드릴까요?</p>
              <p className="mt-2 text-sm">날씨, 상품, 주문 내역 등을 물어보세요.</p>
            </div>
          )}

          {messages.map((message) => (
            <div key={message.id} className="message-enter">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {message.role === "user" ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="mb-1 text-sm font-medium">
                    {message.role === "user" ? "You" : "AI Assistant"}
                  </p>
                  <div className="text-sm">
                    {typeof message.content === "string" ? (
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    ) : (
                      message.content
                    )}
                  </div>
                </div>
              </div>
              <Separator className="my-4" />
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>응답 생성 중...</span>
            </div>
          )}

          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="메시지를 입력하세요..."
            disabled={isLoading}
          />
          <Button type="submit" disabled={isLoading || !input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
