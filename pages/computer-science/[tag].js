import fs from 'fs'
import showdown from 'showdown'
import path from 'path'

const root = process.cwd()

const entries = Array.from(
  fs.readdirSync(path.join(root, 'public', 'static', 'computer-science'))
).map((entry) => {
  // parse xxx.md to xxx
  const name = entry.split('.')[0]
  // replace space with dash
  const route = name.replace(/ /g, '-')
  return { filePath: entry, route: route, name: name }
})

export async function getStaticPaths() {
  const routes = entries.map((entry) => entry.route)
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
  const entry = entries.filter((entry) => entry.route === params.tag)[0]
  const filePath = entry.filePath
  const markdown = fs.readFileSync(
    path.join(root, 'public', 'static', 'computer-science', filePath),
    'utf8'
  )
  return { props: { markdown: markdown, title: entry.name } }
}

export default function ComputerScience({ markdown, title }) {
  const converter = new showdown.Converter()
  const html = converter.makeHtml(markdown)
  // replace [[link]] with <a href="link">link</a>
  const htmlWithLinks = html.replaceAll(/\[\[.*?\]\]/g, (match) => {
    // remove [[ and ]]
    var link = match.slice(2, -2)
    // replace spaces with dashes
    link = link.replaceAll(' ', '-')
    return `<a href="/computer-science/${link}" style="color: #0070f3;">${match.slice(2, -2)}</a>`
  })
  // add title
  // replace -xxx with xxx (remove the dash)
  const titleWithoutDash = title.replace(/^-/, '')
  const htmlWithTitle = `<h1 style="font-size: 2rem; font-weight: 700; margin-bottom: 1rem;">${titleWithoutDash}</h1>${htmlWithLinks}`
  return <div dangerouslySetInnerHTML={{ __html: htmlWithTitle }} />
}
