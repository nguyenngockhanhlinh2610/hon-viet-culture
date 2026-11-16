import React, { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { FESTIVALS } from '../../data/festivals';
import { SPECIALTIES } from '../../data/specialties';
import { WORKSHOPS } from '../../data/workshops';
import { HERITAGE_SITES } from '../../data/heritageSites';
import { NavSection } from '../../types';

interface AiHeritageAssistantProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (section: NavSection) => void;
}

interface ChatMessage {
  sender: 'ai' | 'user';
  text: string;
  actionSection?: NavSection;
  actionLabel?: string;
}

const QUICK_PROMPTS = [
  'Lễ hội An Giang diễn ra khi nào?',
  'Đặc sản Cà Mau là gì?',
  'Cách đặt lịch chuốt gốm Mang Thít',
];

function buildGroundedReply(question: string): Omit<ChatMessage, 'sender'> {
  const q = question.toLowerCase();

  if (q.includes('lễ hội') && q.includes('an giang')) {
    const fests = FESTIVALS.filter((f) => f.provinceId === 'an-giang');
    return {
      text: `An Giang nổi bật với ${fests.length} đại lễ: ${fests
        .map((f) => `• ${f.name} (${f.timeLabel})`)
        .join('\n')}`,
      actionSection: 'festivals',
      actionLabel: 'Xem trang Lễ hội →',
    };
  }

  if (q.includes('đặc sản') && q.includes('cà mau')) {
    const sps = SPECIALTIES.filter((s) => s.provinceId === 'ca-mau');
    return {
      text: `Đặc sản Cà Mau gồm ${sps.length} món trứ danh: ${sps
        .map((s) => s.name)
        .join(', ')}.`,
      actionSection: 'specialties',
      actionLabel: 'Xem Đặc sản Cà Mau →',
    };
  }

  if (q.includes('gốm') || q.includes('mang thít') || q.includes('đặt lịch')) {
    const ws = WORKSHOPS.find((w) => w.id === 'ws-chuot-gom-mang-thit');
    return {
      text: ws
        ? `Để đặt lịch "${ws.name}" (${ws.durationMinutes} phút · ${ws.priceVnd.toLocaleString('vi-VN')}đ/khách), bạn vào mục Trải nghiệm → bấm "Đặt lịch" và chọn ngày giờ. Lưu ý: hỗ trợ hủy miễn phí trước 5 ngày (120 giờ).`
        : 'Bạn có thể chọn bất kỳ workshop nào trong mục Trải nghiệm và nhấn "Đặt lịch".',
      actionSection: 'workshops',
      actionLabel: 'Mở trang Trải nghiệm →',
    };
  }

  const matchedSite = HERITAGE_SITES.find((s) =>
    q.includes(s.name.toLowerCase())
  );
  if (matchedSite) {
    return {
      text: `${matchedSite.name} (${matchedSite.address}): ${matchedSite.description}`,
      actionSection: 'explore',
      actionLabel: 'Xem tất cả Di tích →',
    };
  }

  return {
    text: 'Mình là Trợ lý AI Hồn Việt Culture. Bạn có thể hỏi về 20 di tích, 11 lễ hội, 26 đặc sản hoặc cách đặt lịch 10 workshop làng nghề tại Cần Thơ, Vĩnh Long, Đồng Tháp, An Giang, Cà Mau!',
  };
}

export const AiHeritageAssistant: React.FC<AiHeritageAssistantProps> = ({
  open,
  onClose,
  onNavigate,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'ai',
      text: 'Xin chào! Mình là Trợ lý AI Hồn Việt Culture. Bạn muốn tra cứu di tích, lễ hội, đặc sản hay đặt lịch làng nghề miền Tây nào?',
    },
  ]);
  const [input, setInput] = useState('');

  if (!open) return null;

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const reply = buildGroundedReply(trimmed);
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: trimmed },
      { sender: 'ai', ...reply },
    ]);
    setInput('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[370px] max-w-[calc(100vw-2rem)] rounded-2xl bg-heritage-paper border-2 border-heritage-gold shadow-2xl flex flex-col overflow-hidden">
      <div className="bg-heritage-burgundy text-white px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-heritage-gold text-heritage-burgundyDark flex items-center justify-center shrink-0">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="font-serif font-bold text-sm text-[#FEF3C7]">
              Trợ Lý AI Hồn Việt Culture
            </div>
            <div className="text-[10px] text-white/85">
              Tra cứu tự động dữ liệu 5 tỉnh ĐBSCL
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg hover:bg-white/15"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-3 h-72 overflow-y-auto space-y-2.5 bg-heritage-paper">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-xs whitespace-pre-line leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-heritage-burgundy text-white'
                  : 'bg-white border border-heritage-gold/70 text-heritage-ink shadow-sm'
              }`}
            >
              {m.text}
            </div>
            {m.actionSection && m.actionLabel && (
              <button
                type="button"
                onClick={() => {
                  onNavigate(m.actionSection!);
                  onClose();
                }}
                className="mt-1 text-[11px] font-semibold text-heritage-burgundy hover:underline"
              >
                {m.actionLabel}
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="px-3 py-2 border-t border-heritage-gold/25 bg-white flex flex-wrap gap-1.5">
        {QUICK_PROMPTS.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => sendMessage(p)}
            className="text-[11px] px-2 py-1 rounded-full bg-heritage-paper border border-heritage-gold/40 text-heritage-burgundy hover:bg-heritage-gold/20"
          >
            {p}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
        className="p-2.5 border-t border-heritage-gold/30 bg-white flex gap-2"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi về di sản miền Tây..."
          className="flex-1 px-3 py-1.5 rounded-lg border border-heritage-gold/40 text-xs focus:outline-none focus:border-heritage-burgundy"
        />
        <button
          type="submit"
          className="p-2 rounded-lg bg-heritage-burgundy text-white hover:bg-heritage-burgundyDark"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
