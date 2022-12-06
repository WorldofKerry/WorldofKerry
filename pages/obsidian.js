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
      <h1>Click on the nodes for more info!</h1>
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
              color: '#000000',
              'text-valign': 'center',
              'text-halign': 'center',
              'background-color': '#A020F0',
              'text-outline-color': '#FFFF00',
              'text-outline-width': 1,
              'text-outline-opacity': 0.75,
              'font-size': 5,
              'font-weight': 'bold',
              'text-wrap': 'wrap',
              'text-max-width': '15px',
              // 'text-background-color': '#ffffff',
              // 'text-background-opacity': 0.5,
              // 'text-background-shape': 'roundrectangle',
              // 'text-background-padding': '5px',
              // 'text-border-color': '#000000',
              // 'text-border-opacity': 0.5,
              // 'text-border-width': 1,
              // 'text-border-style': 'solid',
              // 'text-border-shape': 'roundrectangle',
              // 'text-margin-y': '-5px',
              'text-margin-x': '0px',
              'text-events': 'yes',
              'text-rotation': 'autorotate',
            },
          },
          {
            selector: 'edge',
            style: {
              width: 0.75,
            },
          },
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
