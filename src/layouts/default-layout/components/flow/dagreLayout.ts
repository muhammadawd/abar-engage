import dagre from 'dagre'

export function layoutElements(elements, direction = 'TB') {
    const g = new dagre.graphlib.Graph()
    g.setDefaultEdgeLabel(() => ({}))

    g.setGraph({
        rankdir: direction,
        nodesep: 80, // المسافة الأفقية
        ranksep: 120, // المسافة الرأسية
        marginx: 150,
        marginy: 100,
    })

    const nodes = elements.filter((el) => !el.source)
    const edges = elements.filter((el) => el.source)

    nodes.forEach((node) => {
        g.setNode(node.id, {
            width: 220,  // زودت الحجم العرضي
            height: 100, // زودت الارتفاع لتفادي التراكب
        })
    })

    edges.forEach((edge) => {
        g.setEdge(edge.source, edge.target)
    })

    dagre.layout(g)

    return elements.map((el) => {
        if (!el.source) {
            const nodeWithPos = g.node(el.id)
            el.position = {
                x: nodeWithPos.x - 110,
                y: nodeWithPos.y - 50,
            }
        }
        return el
    })
}
