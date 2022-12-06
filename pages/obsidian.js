import fs from 'fs'
import { useTheme } from 'next-themes'
import CytoscapeComponent from 'react-cytoscapejs'
import path from 'path'

const root = process.cwd()

function fileNameFilter(fileName) {
  // Filter out xxxx-xx-xx in the file name
  const dateRegex = /\d{4}-\d{2}-\d{2}/
  // Filter out .webm .png .jpg .jpeg .gif
  const extensionRegex = /\.(webm|png|jpg|jpeg|gif)$/
  return !dateRegex.test(fileName) && !extensionRegex.test(fileName)
}

export default function Graph({ graph }) {
  var nodes = graph.elements.nodes.filter((node) => {
    return fileNameFilter(node.data.name)
  })
  nodes = nodes.map((node) => {
    var newNode = {}
    newNode.data = {}
    newNode.data.id = node.data.id
    newNode.data.label = node.data.name
    newNode.position = {}
    newNode.position.x = Math.round(node.position.x)
    newNode.position.y = Math.round(node.position.y)
    newNode.data.href = 'obsidian/' + node.data.name.replaceAll(' ', '-')
    return newNode
  })
  var edges = graph.elements.edges.filter((edge) => {
    return fileNameFilter(edge.data.source) && fileNameFilter(edge.data.target)
  })
  edges = edges.map((edge) => {
    var newEdge = {}
    newEdge.data = {}
    newEdge.data.source = edge.data.source
    newEdge.data.target = edge.data.target
    newEdge.label = edge.data.context
    return newEdge
  })
  const elements = [...nodes, ...edges]
  const { theme, resolvedTheme } = useTheme()
  return (
    <>
      <h1>Plz interact with me :3</h1>
      <CytoscapeComponent
        elements={elements}
        style={{
          width: '900px',
          height: '506px',
          backgroundColor: theme === 'dark' || resolvedTheme === 'dark' ? '#171717' : '#ffffff',
        }}
        stylesheet={[
          {
            selector: 'node',
            style: {
              label: 'data(label)',
              color: theme === 'dark' || resolvedTheme === 'dark' ? '#ffffff' : '#000000',
            },
          },
          // {
          //   selector: 'edge',
          //   style: {
          //     width: 1,
          //   },
          // },
        ]}
        cy={(cy) => {
          cy.on('tap', 'node', function (evt) {
            // redirect to the node's page
            window.location.href = evt.target.data('href')
            // console.log(evt.target.style())
          })
          let options = {
            name: 'cose',
          }
          cy.layout(options)
        }}
      />
    </>
  )
}

export async function getStaticProps() {
  const graph = JSON.parse(fs.readFileSync(path.join(root, 'data', 'graph.json'), 'utf8'))
  return {
    props: {
      graph,
    },
  }
}
