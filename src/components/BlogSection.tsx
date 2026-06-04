import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BLOG_POSTS } from '../data';
import { BlogPost, UserReflection } from '../types';
import { BookOpen, PenTool, Save, CheckCircle2, ChevronRight, Sparkles, Clock, Calendar, Heart, MessageSquare, Trash2 } from 'lucide-react';

export default function BlogSection() {
  const [selectedPost, setSelectedPost] = React.useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = React.useState<string>('All');
  
  // Interactive journaling inputs
  const [journalInput, setJournalInput] = React.useState<string>('');
  const [savedReflections, setSavedReflections] = React.useState<UserReflection[]>([]);
  const [isSuccessSaved, setIsSuccessSaved] = React.useState<boolean>(false);

  // Load reflections from localStorage
  React.useEffect(() => {
    const list = localStorage.getItem('mindful_path_reflections');
    if (list) {
      try {
        setSavedReflections(JSON.parse(list));
      } catch (err) {
        console.error("Error parsing reflections", err);
      }
    }
  }, []);

  // Post category filter setup
  const categories = ['All', 'Self-Care', 'Relationships', 'Mindfulness'];

  const filteredPosts = BLOG_POSTS.filter((post) => {
    if (activeCategory === 'All') return true;
    return post.category === activeCategory;
  });

  // Handle saving journal entries
  const handleSaveReflection = (postId: string) => {
    if (!journalInput.trim()) return;

    const newReflection: UserReflection = {
      postId,
      reflectionText: journalInput,
      savedAt: new Date().toISOString()
    };

    const filtered = savedReflections.filter((ref) => ref.postId !== postId);
    const updated = [newReflection, ...filtered];

    setSavedReflections(updated);
    localStorage.setItem('mindful_path_reflections', JSON.stringify(updated));

    setIsSuccessSaved(true);
    setTimeout(() => {
      setIsSuccessSaved(false);
    }, 3000);
  };

  // Delete specific reflection tracking
  const handleDeleteReflection = (postId: string) => {
    const updated = savedReflections.filter((ref) => ref.postId !== postId);
    setSavedReflections(updated);
    localStorage.setItem('mindful_path_reflections', JSON.stringify(updated));
  };

  const getBlogPostTitle = (id: string) => {
    return BLOG_POSTS.find(p => p.id === id)?.title || 'Wellness Reflection';
  };

  const getSavedReflectionForPost = (postId: string) => {
    return savedReflections.find((ref) => ref.postId === postId)?.reflectionText || '';
  };

  // Open a specific blog post
  const handleOpenPost = (post: BlogPost) => {
    setSelectedPost(post);
    setJournalInput(getSavedReflectionForPost(post.id));
  };

  return (
    <section id="blog-section" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl space-y-3">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-blue-600">
              Cognitive Library & Growth
            </p>
            <h2 className="font-serif text-3xl font-medium tracking-tight text-slate-900 sm:text-4xl">
              Self-Care Reflections Hub
            </h2>
            <div className="h-0.5 w-12 bg-blue-600"></div>
          </div>
          <p className="font-sans text-slate-600 text-sm max-w-sm leading-relaxed">
            Read medical insights on stress, conflict loops, and neuroscience, and interactively pen down your thoughts.
          </p>
        </div>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-slate-200">
          {categories.map((cat) => {
            const isPicked = activeCategory === cat;
            return (
              <button
                id={`blog-category-${cat}`}
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-sm font-sans text-xs font-semibold transition-all ${
                  isPicked
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start font-sans">
          
          {/* Main post grid */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post) => {
                const hasReflection = savedReflections.some((ref) => ref.postId === post.id);
                return (
                  <motion.article
                    id={`blog-post-${post.id}`}
                    key={post.id}
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col justify-between rounded-sm border border-slate-200 bg-white p-6 shadow-sm hover:border-blue-300 transition-all cursor-pointer group"
                    onClick={() => handleOpenPost(post)}
                  >
                    <div className="space-y-3.5">
                      {/* Meta layout */}
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-blue-700 bg-blue-50/80 px-2 py-0.5 rounded-sm">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-2 font-mono text-[10px] text-slate-400">
                          <span className="flex items-center gap-0.5"><Clock className="h-3 w-3" /> {post.readTime}</span>
                        </div>
                      </div>

                      {/* Header */}
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                          {post.title}
                        </h3>
                        <p className="font-sans text-xs text-slate-650 line-clamp-3 leading-relaxed">
                          {post.summary}
                        </p>
                      </div>
                    </div>

                    {/* Bottom row badges */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="h-5 w-5 rounded-full bg-slate-50 border text-blue-500 flex items-center justify-center font-bold font-sans text-[10px] uppercase">
                          {post.author.charAt(4)}
                        </span>
                        <span className="font-sans text-[10px] text-slate-500 font-medium">{post.author}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {hasReflection && (
                          <span className="flex items-center gap-1 font-sans text-[10px] text-blue-850 font-bold bg-blue-50 px-2 py-0.5 rounded-sm" title="You wrote down reflections!">
                            <PenTool className="h-3 w-3" /> Journaled
                          </span>
                        )}
                        <span className="font-sans text-xs font-bold text-blue-600 group-hover:text-blue-700 transition-colors flex items-center gap-0.5">
                          Read <span><ChevronRight className="h-3.5 w-3.5" /></span>
                        </span>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right sidebar: Your Private Wellness Journal summary */}
          <div className="lg:col-span-4 bg-white rounded-sm border border-slate-200 p-5 space-y-4 shadow-sm">
            <h3 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-[0.2em] flex items-center gap-1.5 border-b border-slate-200 pb-2.5">
              <BookOpen className="h-4.5 w-4.5 text-blue-600" /> Your Private Journal
            </h3>
            
            {savedReflections.length === 0 ? (
              <div className="text-center py-6 space-y-2">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-sm bg-slate-50 text-slate-400 border border-slate-200">
                  <PenTool className="h-5 w-5 text-blue-500" />
                </div>
                <div className="space-y-0.5">
                  <p className="font-serif text-xs font-bold text-slate-900">No reflections written yet</p>
                  <p className="font-sans text-[11px] text-slate-600 max-w-xs mx-auto leading-normal">
                    Click on any article, read the therapeutic medical summary, and write down your custom reflections in the prompt at the bottom!
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3.5 max-h-[460px] overflow-y-auto pr-0.5">
                <p className="font-sans text-[10px] text-blue-750 bg-blue-50/80 p-2.5 rounded-sm font-medium leading-relaxed border border-blue-105">
                  These self-reflection logs are securely stored inside your client browser storage for your personal self-referential study.
                </p>
                {savedReflections.map((ref) => (
                  <div
                    id={`reflection-item-${ref.postId}`}
                    key={ref.postId}
                    className="p-3 rounded-sm border border-slate-150 bg-slate-50/40 space-y-2 relative"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <p className="font-serif text-xs font-bold text-slate-900 line-clamp-1 leading-snug">
                        {getBlogPostTitle(ref.postId)}
                      </p>
                      <button
                        id={`del-reflection-${ref.postId}`}
                        onClick={() => handleDeleteReflection(ref.postId)}
                        className="p-1 rounded-sm text-slate-400 hover:text-red-500 hover:bg-slate-100 transition-colors"
                        title="Delete entry"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                    
                    <p className="font-sans text-[11px] text-slate-600 italic line-clamp-3 leading-relaxed">
                      "{ref.reflectionText}"
                    </p>
                    
                    <p className="font-mono text-[9px] text-blue-500">
                      Saved: {new Date(ref.savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Modal/Full view of selected post */}
        <AnimatePresence>
          {selectedPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setSelectedPost(null);
                  setJournalInput('');
                }}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98, y: 20 }}
                transition={{ type: 'spring', duration: 0.4 }}
                className="relative w-full max-w-3xl bg-white rounded-sm shadow-xl overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]"
              >
                {/* Header bar */}
                <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wide font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-sm">
                      {selectedPost.category}
                    </span>
                    <p className="font-sans text-[11px] text-slate-400 mt-1">Written by {selectedPost.author} • {selectedPost.date}</p>
                  </div>
                  <button
                    id="close-reading-btn"
                    onClick={() => {
                      setSelectedPost(null);
                      setJournalInput('');
                    }}
                    className="p-1 px-3 rounded-sm border border-slate-200 bg-white hover:bg-slate-100 font-sans text-xs font-bold text-slate-650 transition-colors"
                  >
                    Close Reading
                  </button>
                </div>

                {/* Content area: Scrollable */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow font-sans">
                  <h3 className="font-serif text-xl md:text-2xl font-bold tracking-tight text-slate-900">
                    {selectedPost.title}
                  </h3>

                  {/* Body Text */}
                  <div className="font-sans text-slate-750 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-line border-b border-slate-100 pb-8">
                    {selectedPost.content}
                  </div>

                  {/* Interactive self-care journal prompt box */}
                  <div className="rounded-sm border border-blue-100 bg-blue-50/30 p-5 md:p-6 space-y-4">
                    <div className="flex gap-2 items-center">
                      <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-blue-600 text-white">
                        <PenTool className="h-4 w-4" />
                      </div>
                      <h4 className="font-sans text-xs font-bold text-slate-900 uppercase tracking-[0.15em] flex items-center gap-1">
                        Somatic Exercise & Reflection Prompt
                      </h4>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-slate-750 bg-white p-3 rounded-sm border border-slate-200 italic leading-relaxed">
                      "{selectedPost.reflectionPrompt}"
                    </p>

                    <div className="space-y-2">
                      <label id="reflection-input-label" className="font-sans text-xs font-bold text-slate-900">Your Secure Practice Journal Entry:</label>
                      <textarea
                        id="journal-reflex-input"
                        rows={4}
                        placeholder="Type down your self-assessment or reflections safely here..."
                        value={journalInput}
                        onChange={(e) => setJournalInput(e.target.value)}
                        className="w-full rounded-sm border border-slate-200 bg-white p-3 text-xs sm:text-sm font-sans text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none leading-relaxed"
                      />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-1">
                      <div className="flex items-center gap-1 font-sans text-[11px] text-blue-600 font-medium">
                        <MessageSquare className="h-3.5 w-3.5 text-slate-400" /> Auto-saved locally
                      </div>
                      <button
                        id="save-reflection-btn"
                        type="button"
                        onClick={() => handleSaveReflection(selectedPost.id)}
                        className="inline-flex items-center gap-1.5 rounded-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-sans text-xs font-bold uppercase tracking-widest transition-all font-bold"
                      >
                        <Save className="h-3.5 w-3.5" /> Save Reflection
                      </button>
                    </div>

                    {isSuccessSaved && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-1.5 items-center justify-center rounded-sm bg-blue-50/80 text-blue-700 p-2 font-sans text-xs font-bold border border-blue-100"
                      >
                        <CheckCircle2 className="h-4 w-4" /> Entry updated and logged inside Private Journal list!
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Bottom navigation */}
                <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex justify-end gap-3 font-sans">
                  <button
                    id="reading-finished-btn"
                    onClick={() => {
                      setSelectedPost(null);
                      setJournalInput('');
                    }}
                    className="px-5 py-2 rounded-sm bg-blue-600 hover:bg-blue-700 font-sans text-xs font-bold text-white uppercase tracking-widest transition-colors font-bold"
                  >
                    Close Article
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
