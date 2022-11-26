import fs from 'fs'
import path from 'path'

const root = process.cwd()
const entries = Array.from(fs.readdirSync(path.join(root, 'data', 'computer-science'))).map(
  (entry) => {
    // parse xxx.md to xxx or -xxx.md to xxx
    const name = entry.replace(/\.md$/, '').replace(/^-/, '')
    // replace space with dash
    const route = name.replaceAll(' ', '-')
    return { filePath: entry, route: route, name: name }
  }
)

export async function getStaticPaths() {
  const routes = entries.map((entry) => entry.route)
  console.log(routes.slice(0, 1))
  return {
    paths: routes.map((tag) => ({
      params: {
        tag,
      },
    })),
    fallback: false,
  }
  // const tags = await getAllTags('blog')

  // return {
  //   paths: Object.keys(tags).map((tag) => ({
  //     params: {
  //       tag,
  //     },
  //   })),
  //   fallback: false,
  // }
}

export async function getStaticProps({ params }) {
  const text = entries.filter((entry) => entry.route === params.tag)[0].filePath
  return { props: { text: text } }

  // const allPosts = await getAllFilesFrontMatter('blog')
  // const filteredPosts = allPosts.filter(
  //   (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  // )

  // // rss
  // if (filteredPosts.length > 0) {
  //   const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
  //   const rssPath = path.join(root, 'public', 'tags', params.tag)
  //   fs.mkdirSync(rssPath, { recursive: true })
  //   fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)
  // }

  // return { props: { posts: filteredPosts, tag: params.tag } }
}

export default function ComputerScience({ text }) {
  // Capitalize first letter and convert space to dash
  return (
    <>
      <p>{text}</p>
    </>
  )
}
