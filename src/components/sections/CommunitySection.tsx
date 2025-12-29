'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  MessageCircle,
  Heart,
  Send,
  Plus,
  Search,
  Filter,
  ThumbsUp,
  Users,
  Sparkles,
  HelpCircle,
  Lightbulb,
  PartyPopper,
  UserCircle,
} from 'lucide-react';
import { CommunityPost, CommunityReply } from '@/lib/types';

export default function CommunitySection() {
  const { t } = useLanguage();
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Maria Silva',
      title: 'Como lidar com mudanças na rotina?',
      content: 'Meu filho tem muita dificuldade quando há mudanças na rotina diária. Alguém tem dicas de como preparar melhor essas transições?',
      category: 'question',
      tags: ['rotina', 'transição', 'dicas'],
      likes: 12,
      replies: [
        {
          id: 'r1',
          postId: '1',
          userId: 'user2',
          userName: 'João Santos',
          content: 'Uso quadros visuais com antecedência! Mostro as mudanças com imagens alguns dias antes. Tem funcionado muito bem.',
          likes: 8,
          createdAt: new Date('2024-01-15T10:30:00'),
          isAnonymous: false,
        },
        {
          id: 'r2',
          postId: '1',
          userId: 'user3',
          userName: 'Ana Costa',
          content: 'Concordo! Também uso histórias sociais para explicar o que vai acontecer. Ajuda muito a reduzir a ansiedade.',
          likes: 5,
          createdAt: new Date('2024-01-15T11:00:00'),
          isAnonymous: false,
        },
      ],
      createdAt: new Date('2024-01-15T09:00:00'),
      isAnonymous: false,
    },
    {
      id: '2',
      userId: 'user4',
      userName: 'Usuário Anônimo',
      title: 'Pequena vitória hoje!',
      content: 'Minha filha conseguiu fazer contato visual durante toda a conversa hoje pela primeira vez! Estou tão emocionada! 💙',
      category: 'celebration',
      tags: ['conquista', 'progresso', 'alegria'],
      likes: 45,
      replies: [
        {
          id: 'r3',
          postId: '2',
          userId: 'user5',
          userName: 'Paula Oliveira',
          content: 'Que maravilha! Parabéns pela conquista! Cada passo é uma vitória! 🎉',
          likes: 12,
          createdAt: new Date('2024-01-16T14:20:00'),
          isAnonymous: false,
        },
      ],
      createdAt: new Date('2024-01-16T14:00:00'),
      isAnonymous: true,
    },
    {
      id: '3',
      userId: 'user6',
      userName: 'Carlos Mendes',
      title: 'Dica: Aplicativo de comunicação alternativa',
      content: 'Descobri um app gratuito de CAA que tem ajudado muito na comunicação. Alguém mais usa? Posso compartilhar o nome se houver interesse.',
      category: 'tip',
      tags: ['tecnologia', 'comunicação', 'app'],
      likes: 23,
      replies: [],
      createdAt: new Date('2024-01-17T08:30:00'),
      isAnonymous: false,
    },
  ]);

  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'question' as CommunityPost['category'],
    tags: '',
    isAnonymous: false,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');

  const handleCreatePost = () => {
    if (!newPost.title.trim() || !newPost.content.trim()) return;

    const post: CommunityPost = {
      id: Date.now().toString(),
      userId: 'currentUser',
      userName: newPost.isAnonymous ? 'Usuário Anônimo' : 'Você',
      title: newPost.title,
      content: newPost.content,
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      likes: 0,
      replies: [],
      createdAt: new Date(),
      isAnonymous: newPost.isAnonymous,
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '', category: 'question', tags: '', isAnonymous: false });
    setShowNewPost(false);
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleReply = (postId: string) => {
    if (!replyContent.trim()) return;

    const reply: CommunityReply = {
      id: Date.now().toString(),
      postId,
      userId: 'currentUser',
      userName: 'Você',
      content: replyContent,
      likes: 0,
      createdAt: new Date(),
      isAnonymous: false,
    };

    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, replies: [...post.replies, reply] }
        : post
    ));

    setReplyContent('');
    setReplyingTo(null);
  };

  const getCategoryIcon = (category: CommunityPost['category']) => {
    switch (category) {
      case 'question': return <HelpCircle className="w-4 h-4" />;
      case 'experience': return <MessageCircle className="w-4 h-4" />;
      case 'support': return <Heart className="w-4 h-4" />;
      case 'tip': return <Lightbulb className="w-4 h-4" />;
      case 'celebration': return <PartyPopper className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: CommunityPost['category']) => {
    switch (category) {
      case 'question': return 'from-blue-500 to-cyan-500';
      case 'experience': return 'from-purple-500 to-pink-500';
      case 'support': return 'from-red-500 to-pink-500';
      case 'tip': return 'from-yellow-500 to-orange-500';
      case 'celebration': return 'from-green-500 to-teal-500';
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || post.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-purple-600" />
            {t('community')}
          </h2>
          <p className="text-gray-600 mt-1">{t('communityDesc')}</p>
        </div>
        <Button
          onClick={() => setShowNewPost(!showNewPost)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
        >
          <Plus className="w-4 h-4" />
          {t('newPost')}
        </Button>
      </div>

      {/* New Post Form */}
      {showNewPost && (
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            {t('createNewPost')}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('postTitle')}
              </label>
              <Input
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                placeholder={t('postTitlePlaceholder')}
                className="bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('postCategory')}
              </label>
              <Select
                value={newPost.category}
                onValueChange={(value) => setNewPost({ ...newPost, category: value as CommunityPost['category'] })}
              >
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="question">{t('categoryQuestion')}</SelectItem>
                  <SelectItem value="experience">{t('categoryExperience')}</SelectItem>
                  <SelectItem value="support">{t('categorySupport')}</SelectItem>
                  <SelectItem value="tip">{t('categoryTip')}</SelectItem>
                  <SelectItem value="celebration">{t('categoryCelebration')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('postContent')}
              </label>
              <Textarea
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                placeholder={t('postContentPlaceholder')}
                rows={4}
                className="bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('postTags')}
              </label>
              <Input
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                placeholder={t('postTagsPlaceholder')}
                className="bg-white"
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="anonymous"
                checked={newPost.isAnonymous}
                onChange={(e) => setNewPost({ ...newPost, isAnonymous: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-700">
                {t('postAnonymous')}
              </label>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCreatePost}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
              >
                <Send className="w-4 h-4" />
                {t('publish')}
              </Button>
              <Button
                onClick={() => setShowNewPost(false)}
                variant="outline"
              >
                {t('cancel')}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('searchPosts')}
            className="pl-10 bg-white"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full sm:w-48 bg-white">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <SelectValue />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t('allCategories')}</SelectItem>
            <SelectItem value="question">{t('categoryQuestion')}</SelectItem>
            <SelectItem value="experience">{t('categoryExperience')}</SelectItem>
            <SelectItem value="support">{t('categorySupport')}</SelectItem>
            <SelectItem value="tip">{t('categoryTip')}</SelectItem>
            <SelectItem value="celebration">{t('categoryCelebration')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">{t('noPosts')}</p>
          </Card>
        ) : (
          filteredPosts.map(post => (
            <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
              {/* Post Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <UserCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900">{post.userName}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <div className={`px-2 py-1 rounded-full bg-gradient-to-r ${getCategoryColor(post.category)} flex items-center gap-1`}>
                      {getCategoryIcon(post.category)}
                      <span className="text-xs text-white font-medium">
                        {t(`category${post.category.charAt(0).toUpperCase() + post.category.slice(1)}`)}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mt-2">{post.title}</h3>
                </div>
              </div>

              {/* Post Content */}
              <p className="text-gray-700 mb-4 whitespace-pre-wrap">{post.content}</p>

              {/* Tags */}
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLikePost(post.id)}
                  className="gap-2 text-gray-600 hover:text-purple-600"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span>{post.likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(replyingTo === post.id ? null : post.id)}
                  className="gap-2 text-gray-600 hover:text-purple-600"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.replies.length}</span>
                </Button>
              </div>

              {/* Replies */}
              {post.replies.length > 0 && (
                <div className="mt-4 space-y-3 pl-4 border-l-2 border-purple-200">
                  {post.replies.map(reply => (
                    <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                          <UserCircle className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium text-sm text-gray-900">{reply.userName}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{reply.content}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="mt-2 gap-1 text-gray-600 hover:text-purple-600 h-auto p-1"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span className="text-xs">{reply.likes}</span>
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {replyingTo === post.id && (
                <div className="mt-4 pl-4 border-l-2 border-purple-200">
                  <Textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder={t('replyPlaceholder')}
                    rows={3}
                    className="mb-2"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleReply(post.id)}
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white gap-2"
                    >
                      <Send className="w-3 h-3" />
                      {t('reply')}
                    </Button>
                    <Button
                      onClick={() => setReplyingTo(null)}
                      size="sm"
                      variant="outline"
                    >
                      {t('cancel')}
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
