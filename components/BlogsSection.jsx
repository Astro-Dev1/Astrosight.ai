'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fetchEntries } from '../lib/contentful';
import { motion } from 'framer-motion';

export default function BlogsSection() {
  const [latestPosts, setLatestPosts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function getPosts() {
      const allPosts = await fetchEntries();
      setLatestPosts(allPosts.slice(0, 8));
    }

    getPosts();
  }, []);

  return (
    <section className=" px-0 ">
  <h2 className="text-xl font-bold text-center mb-5">
    Latest <span className="text-[#FF6D3F]">Blogs</span>
  </h2>
    {/* Chevron Buttons (Desktop Only) */}
 

  <div
    ref={scrollRef}
    className="flex overflow-x-auto gap-4 snap-x scroll-smooth min-h-[350px] pb-2"
  >
    {latestPosts.map((post) => (
      <motion.div
       key={post.sys.id}
      whileHover={{ scale: 0.98 }}
      className="mb-4 flex-shrink-0 snap-center bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
      style={{
        width: 'clamp(240px, 22%, 350px)',    // 👈 On mobile ~240px, on large ~22% (show ~4-5 in desktop)
        minWidth: 'clamp(140px, 70%, 150px)', // 👈 Always maintain a good min width
      }}
    >
      <Link href={`/blog/${post.fields.slug}`}>
        {post.fields.coverImage && (
          <Image
            src={`https:${post.fields.coverImage.fields.file.url}`}
            alt={post.fields.title}
            width={200}
            height={200}
            className="w-auto h-auto object-cover"
          />
        )}
        <div className="p-3 pb-4">
          <h3 className="font-medium text-sm">{post.fields.title}</h3>
          <p className="text-xs text-gray-600 mt-1 line-clamp-3">{post.fields.metaDescription}</p>
        </div>
      </Link>
    </motion.div>
    
    ))}
  </div>

  <div className="flex justify-center mt-4">
    <Link
      href="/blog"
      className="bg-[#f6a041] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#f6a041]"
    >
      View All Blogs
    </Link>
  </div>
</section>

  );
}
