// src/modules/Blog/pages/Blog.tsx
import { useState } from 'react';
import { toast } from 'sonner';
import BlogHeader from '../components/BlogHeader';
import BlogCard from '../components/BlogCard';
import BlogModal from '../components/BlogModal';
import BlogEmptyState from '../components/BlogEmptyState';
import { Loader2 } from 'lucide-react';
import type { BlogPost, CreateBlogPostParams, UpdateBlogPostParams } from '../types';
import useFetchBlogPosts from '../api/useFetchBlogPosts';
import useCreateBlogPost from '../api/useCreateBlogPost';
import useUpdateBlogPost from '../api/useUpdateBlogPost';
import useDeleteBlogPost from '../api/useDeleteBlogPost';
import useToggleBlogPostStatus from '../api/useToggleBlogPostStatus';

const Blog = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editPost, setEditPost] = useState<BlogPost | null>(null);

  const { data: posts, isLoading } = useFetchBlogPosts();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();
  const toggleStatusMutation = useToggleBlogPostStatus();

  const handleCreateNew = () => {
    setEditPost(null);
    setIsModalOpen(true);
  };

  const handleEdit = (post: BlogPost) => {
    setEditPost(post);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: CreateBlogPostParams | UpdateBlogPostParams) => {
    try {
      if ('id' in data) {
        await updateMutation.mutateAsync(data);
        toast.success('Blogbeitrag erfolgreich aktualisiert');
      } else {
        await createMutation.mutateAsync(data);
        toast.success('Blogbeitrag erfolgreich erstellt');
      }
      setIsModalOpen(false);
      setEditPost(null);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Fehler beim Speichern');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diesen Blogbeitrag wirklich löschen?')) return;

    try {
      await deleteMutation.mutateAsync(id);
      toast.success('Blogbeitrag erfolgreich gelöscht');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Fehler beim Löschen');
    }
  };

  const handleToggleStatus = async (id: string, isPublished: boolean) => {
    try {
      await toggleStatusMutation.mutateAsync({ id, isPublished });
      toast.success(
        isPublished
          ? 'Blogbeitrag erfolgreich versteckt'
          : 'Blogbeitrag erfolgreich veröffentlicht'
      );
    } catch (error) {
      console.error('Error:', error);
      toast.error('Fehler beim Aktualisieren des Status');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <BlogHeader onCreateNew={handleCreateNew} />

      <div className="mx-auto py-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : posts && posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post.id}
                post={post}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onToggleStatus={handleToggleStatus}
              />
            ))}
          </div>
        ) : (
          <BlogEmptyState onCreateNew={handleCreateNew} />
        )}
      </div>

      <BlogModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditPost(null);
        }}
        onSubmit={handleSubmit}
        editPost={editPost}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};

export default Blog;