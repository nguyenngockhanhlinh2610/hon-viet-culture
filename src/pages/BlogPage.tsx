import React, { useMemo, useState } from 'react';
import { BookOpen, Clock, User, X } from 'lucide-react';
import { BLOG_POSTS } from '../data/blogs';
import { PROVINCES } from '../data/provinces';
import { BlogPost, ProvinceId } from '../types';
import { ProvinceFilterBar } from '../components/common/ProvinceFilterBar';
import { ImageWithFallback } from '../components/common/ImageWithFallback';

export const BlogPage: React.FC = () => {
  const [selectedProvince, setSelectedProvince] = useState<ProvinceId | 'all'>('all');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const filtered = useMemo(
    () =>
      BLOG_POSTS.filter(
        (post) =>
          selectedProvince === 'all' || post.provinceId === selectedProvince
      ),
    [selectedProvince]
  );

  const getProvinceName = (id: ProvinceId) =>
    PROVINCES.find((p) => p.id === id)?.name || id;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-heritage-burgundy">
          Blog Văn hóa &amp; Hành trình Di sản
        </h1>
        <p className="text-sm text-heritage-muted mt-1">
          Những câu chuyện sâu lắng về di tích, nghệ nhân và cẩm nang du lịch 5
          tỉnh Đồng bằng sông Cửu Long.
        </p>
      </div>

      <ProvinceFilterBar
        selected={selectedProvince}
        onSelect={setSelectedProvince}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl bg-white border border-heritage-gold/35 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
          >
            <div className="aspect-[16/10] relative">
              <ImageWithFallback
                src={post.image}
                alt={post.title}
                className="w-full h-full"
              />
              <span className="absolute bottom-2.5 left-3 px-2.5 py-0.5 rounded-full bg-black/65 text-white text-[11px]">
                {getProvinceName(post.provinceId)}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between gap-3">
              <div>
                <div className="flex items-center justify-between text-[11px] font-semibold text-heritage-burgundy mb-1.5">
                  <span>{post.category}</span>
                  <span className="text-heritage-muted font-normal inline-flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readMinutes} phút đọc
                  </span>
                </div>
                <h2 className="font-serif text-lg font-bold text-heritage-ink leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-heritage-muted mt-2 line-clamp-3 leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-heritage-gold/20">
                <span className="text-[11px] text-heritage-muted inline-flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-heritage-burgundy" />
                  {post.author} · {post.publishedAt}
                </span>
                <button
                  type="button"
                  onClick={() => setActivePost(post)}
                  className="text-xs font-semibold text-heritage-burgundy hover:underline inline-flex items-center gap-1"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Đọc bài
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Modal Đọc bài chi tiết */}
      {activePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm">
          <div className="bg-heritage-cream rounded-2xl border border-heritage-gold/50 max-w-2xl w-full max-h-[88vh] flex flex-col overflow-hidden shadow-2xl">
            <div className="relative h-52 shrink-0">
              <ImageWithFallback
                src={activePost.image}
                alt={activePost.title}
                className="w-full h-full"
              />
              <button
                type="button"
                onClick={() => setActivePost(null)}
                aria-label="Đóng bài viết"
                className="absolute top-3 right-3 p-2 rounded-full bg-black/50 text-white hover:bg-heritage-burgundy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-heritage-burgundy font-semibold">
                <span>{activePost.category}</span>
                <span>·</span>
                <span className="text-heritage-muted font-normal">
                  {activePost.author} · {activePost.publishedAt} ·{' '}
                  {activePost.readMinutes} phút đọc
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-heritage-ink leading-snug">
                {activePost.title}
              </h2>
              <p className="text-sm font-medium text-heritage-muted italic border-l-2 border-heritage-gold pl-3">
                {activePost.summary}
              </p>
              <div className="space-y-3 text-sm text-heritage-ink leading-relaxed">
                {activePost.content.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {activePost.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-heritage-paper border border-heritage-gold/40 text-xs"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
