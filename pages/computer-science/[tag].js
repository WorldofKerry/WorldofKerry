import fs from 'fs'
import path from 'path'
import showdown from 'showdown'

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
}

export async function getStaticProps({ params }) {
  const filePath = entries.filter((entry) => entry.route === params.tag)[0].filePath
  const markdown = fs.readFileSync(path.join(root, 'data', 'computer-science', filePath), 'utf8')
  return { props: { markdown: markdown } }
}

export default function ComputerScience({ markdown }) {
  const converter = new showdown.Converter()
  const html = converter.makeHtml(markdown)
  // filter for obsidian [[link]]s
  const links = html.match(/\[\[.*?\]\]/g)
  // replace spaces with dashes
  const linksWithDashes = links.map((link) => link.replaceAll(' ', '-'))
  // replace [[link]] with <a href="link">link</a>
  const htmlWithLinks = html.replaceAll(/\[\[.*?\]\]/g, (match) => {
    // remove [[ and ]]
    var link = match.slice(2, -2)
    // replace spaces with dashes
    link = link.replaceAll(' ', '-')
    return `<a href="/computer-science/${link}" style="color: #0070f3;">${match.slice(2, -2)}</a>`
  })
  return <div dangerouslySetInnerHTML={{ __html: htmlWithLinks }} />
}
