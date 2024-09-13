import NotionIcon from '@/components/NotionIcon'
import { siteConfig } from '@/lib/config'
import { useGlobal } from '@/lib/global'
import Link from 'next/link'
import CategoryItem from './CategoryItem'

/**
 * 不带图片
 * @param {*} param0
 * @returns
 */
const PostItemCardSimple = ({ post, showSummary }) => {
  const showPreview = siteConfig('MAGZINE_POST_LIST_PREVIEW') && post.blockMap
  const { locale } = useGlobal()
  return (
    <div
      key={post.id}
      className='mb-6 max-w-screen-2xl border-t mr-8 py-2 gap-y-4 flex flex-col dark:border-gray-800 '>
      <div className='flex mr-2 items-center'>
        {siteConfig('MAGZINE_POST_LIST_CATEGORY') && (
          <CategoryItem category={post.category} />
        )}
      </div>

      {/* 文章标题 */}
      <Link
        href={post?.href}
        passHref
        className={
          'cursor-pointer hover:underline text-lg leading-tight dark:text-gray-300  dark:hover:text-gray-400'
        }>
        <h2>
          {siteConfig('POST_TITLE_ICON') && <NotionIcon icon={post.pageIcon} />}
          {post.title}
        </h2>
      </Link>

      <div className='text-sm py-2 text-gray-700'>{post.date?.start_date}</div>
    </div>
  )
}

export default PostItemCardSimple
