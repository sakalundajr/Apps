
import React, { useState } from 'react';
import { Post, User } from '../types';
import { ICONS } from '../constants';

interface FeedProps {
  currentUser: User;
}

const INITIAL_POSTS: Post[] = [
  {
    id: '1',
    userId: 'user_1',
    username: 'crypto_whale',
    userAvatar: 'https://picsum.photos/seed/whale/200',
    content: "BTC consolidation looks healthy. Expecting a breakout above $68k soon. HODL tight! 🚀",
    mediaUrl: 'https://picsum.photos/seed/btc_chart/800/450',
    mediaType: 'image',
    timestamp: Date.now() - 3600000,
    likes: 452,
    comments: 24,
    tags: ['BTC', 'Crypto', 'Bullish'],
    prediction: { asset: 'BTC', direction: 'up', entryPrice: 67200 }
  },
  {
    id: '2',
    userId: 'user_2',
    username: 'forex_queen',
    userAvatar: 'https://picsum.photos/seed/sarah/200',
    content: "Watching the EUR/USD pair closely after the ECB announcement. Volatility is rising. Stay disciplined.",
    mediaUrl: 'https://picsum.photos/seed/forex/800/450',
    mediaType: 'image',
    timestamp: Date.now() - 7200000,
    likes: 128,
    comments: 12,
    tags: ['Forex', 'EURUSD', 'Macro']
  }
];

const Feed: React.FC<FeedProps> = ({ currentUser }) => {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedMedia(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!newPostContent.trim() && !selectedMedia) return;

    const newPost: Post = {
      id: Date.now().toString(),
      userId: currentUser.id,
      username: currentUser.username,
      userAvatar: currentUser.avatar,
      content: newPostContent,
      mediaUrl: selectedMedia || undefined,
      mediaType: selectedMedia ? 'image' : undefined,
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      tags: []
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setSelectedMedia(null);
  };

  return (
    <div className="space-y-6">
      {/* Post Creation */}
      <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-lg">
        <div className="flex gap-3">
          <img src={currentUser.avatar} className="w-10 h-10 rounded-full" alt="avatar" />
          <textarea 
            placeholder="Share your trade signal or analysis..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-slate-100 placeholder-slate-500 pt-2 h-24"
          />
        </div>
        
        {selectedMedia && (
          <div className="mt-3 relative inline-block">
            <img src={selectedMedia} className="max-h-60 rounded-xl border border-slate-700" alt="Preview" />
            <button 
              onClick={() => setSelectedMedia(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-800">
          <div className="flex gap-2">
            <label className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer">
              <ICONS.Camera />
              <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
            </label>
            <label className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 rounded-lg transition-all cursor-pointer">
              <ICONS.Video />
              <input type="file" className="hidden" accept="video/*" onChange={handleFileUpload} />
            </label>
          </div>
          <button 
            onClick={handleCreatePost}
            disabled={!newPostContent.trim() && !selectedMedia}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-900 font-bold px-6 py-2 rounded-xl transition-all"
          >
            Post Pulse
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

const PostCard: React.FC<{ post: Post }> = ({ post }) => {
  return (
    <div className="bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 shadow-md group">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <img src={post.userAvatar} className="w-10 h-10 rounded-full border border-slate-700" alt={post.username} />
            <div>
              <p className="font-bold hover:text-emerald-400 cursor-pointer transition-colors">@{post.username}</p>
              <p className="text-xs text-slate-500">{new Date(post.timestamp).toLocaleTimeString()}</p>
            </div>
          </div>
          {post.prediction && (
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
              post.prediction.direction === 'up' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
            }`}>
              {post.prediction.direction === 'up' ? '▲ Long' : '▼ Short'} {post.prediction.asset}
            </div>
          )}
        </div>
        
        <p className="text-slate-200 leading-relaxed mb-4">{post.content}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map(tag => (
            <span key={tag} className="text-xs font-semibold text-emerald-500 hover:underline cursor-pointer">#{tag}</span>
          ))}
        </div>
      </div>

      {post.mediaUrl && (
        <div className="relative aspect-video bg-slate-800 overflow-hidden">
          <img src={post.mediaUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="post media" />
        </div>
      )}

      <div className="p-3 border-t border-slate-800 flex items-center justify-around">
        <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"/></svg>
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          <span className="text-sm font-medium">{post.comments}</span>
        </button>
        <button className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </div>
  );
};

export default Feed;
