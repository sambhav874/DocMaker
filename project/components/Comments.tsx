import { cn } from '@/lib/utils';
import { useIsThreadActive } from '@liveblocks/react-lexical';
import { Composer, Thread } from '@liveblocks/react-ui';
import { useThreads } from '@liveblocks/react/suspense'
import React from 'react';

const ThreadsWrapper = ({ thread } : ThreadWrapperProps) => {
  const isActive = useIsThreadActive(thread.id);
  return (
    <Thread
      thread={thread}
      data-state={isActive ? 'active' : null}
      className={cn('comment-thread border mb-12', isActive && 'border-blue-500 mb-12 shadow-lg', thread.resolved && 'opacity-50')}
    />
  );
};

const Comments = () => {
  const { threads } = useThreads();
  
  return (
    <div className='comments-container min-h-screen'>
      <Composer className='comment-composer ' />
      {threads.map((thread) => (
        <ThreadsWrapper thread={thread} key={thread.id} />
      ))}
    </div>
  );
};

export default Comments;