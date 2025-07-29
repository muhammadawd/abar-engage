import dagre from 'dagre'

export function layoutElements(nodes: any[], edges: any[], direction = 'TB') {
    const dagreGraph = new dagre.graphlib.Graph()
    dagreGraph.setDefaultEdgeLabel(() => ({}))
    dagreGraph.setGraph({rankdir: direction}) // TB = top-bottom, LR = left-right

    // Setup nodes in dagre graph
    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {width: 0, height: 0})
    })

    // Setup edges in dagre graph
    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    return nodes.map((node) => {
        const pos = dagreGraph.node(node.id)
        return {
            ...node,
            position: {
                x: pos.x - 75, // adjust for width
                y: pos.y - 25, // adjust for height
            },
        }
    })
}
