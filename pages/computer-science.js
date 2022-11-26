import dynamic from 'next/dynamic'
import fs from 'fs'
import path from 'path'

// const CytoscapeComponent = dynamic(import('react-cytoscapejs'), { ssr: false })
import CytoscapeComponent from 'react-cytoscapejs'

export default function Graph({ graph }) {
  const elements = graph.elements.nodes.map((e) => {
    console.log(e)
    var newE = {}
    newE.data = {}
    newE.data.id = e.data.id
    newE.data.label = e.data.name
    newE.position = {}
    newE.position.x = Math.round(e.position.x)
    newE.position.y = Math.round(e.position.y)
    return newE
  })
  console.log(elements.slice(0, 1))
  return (
    <>
      <p>Computer Science Yay!</p>
      <CytoscapeComponent elements={elements} style={{ width: '1000px', height: '1000px' }} />
    </>
  )
}

export async function getStaticProps() {
  const graph = JSON.parse(
    fs.readFileSync(path.join(process.cwd(), 'public', 'static', 'graph.json'), 'utf8')
  )
  const elements = graph.elements.nodes
  return {
    props: {
      graph,
    },
  }
}
