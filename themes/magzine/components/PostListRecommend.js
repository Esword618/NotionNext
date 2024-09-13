import { siteConfig } from '@/lib/config'
import PostItemCard from './PostItemCard'
import PostListEmpty from './PostListEmpty'

/**
 * 博文水平列表
 * 含封面
 * 可以指定是否有模块背景色
 * @returns {JSX.Element}
 * @constructor
 */
const PostListRecommend = ({ latestPosts, allNavPages }) => {
  // 获取推荐文章
  const recommendPosts = getTopPosts({ latestPosts, allNavPages })
  if (!recommendPosts || recommendPosts.length === 0) {
    return <PostListEmpty />
  }
  const title = siteConfig('MAGZINE_RECOMMEND_POST_TITLE')

  return (
    <div className={`w-full py-10 bg-[#F6F6F1]`}>
      <div className='max-w-screen-2xl w-full mx-auto'>
        {/* 标题 */}
        <div className='flex justify-between items-center py-6'>
          <h3 className='text-4xl font-bold'>{title}</h3>
        </div>
        {/* 列表 */}
        <ul className='flex gap-4 overflow-x-scroll'>
          {recommendPosts?.map(p => {
            return <PostItemCard key={p.id} post={p} />
          })}
        </ul>
      </div>
    </div>
  )
}

/**
 * 获取推荐置顶文章
 */
function getTopPosts({ latestPosts, allNavPages }) {
  // 默认展示最近更新
  if (
    !siteConfig('MAGZINE_RECOMMEND_POST_TAG') ||
    siteConfig('MAGZINE_RECOMMEND_POST_TAG') === ''
  ) {
    return latestPosts
  }

  // 显示包含‘推荐’标签的文章
  let sortPosts = []

  // 排序方式
  if (siteConfig('MAGZINE_RECOMMEND_POST_SORT_BY_UPDATE_TIME')) {
    sortPosts = Object.create(allNavPages).sort((a, b) => {
      const dateA = new Date(a?.lastEditedDate)
      const dateB = new Date(b?.lastEditedDate)
      return dateB - dateA
    })
  } else {
    sortPosts = Object.create(allNavPages)
  }

  const count = siteConfig('MAGZINE_RECOMMEND_POST_COUNT', 6)
  // 只取前4篇
  const topPosts = []
  for (const post of sortPosts) {
    if (topPosts.length === count) {
      break
    }
    // 查找标签
    if (post?.tags?.indexOf(siteConfig('MAGZINE_RECOMMEND_POST_TAG')) >= 0) {
      topPosts.push(post)
    }
  }
  return topPosts
}

export default PostListRecommend
