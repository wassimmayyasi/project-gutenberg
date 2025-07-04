import { ArrowLeft } from "lucide-react";
import {
    Graph,
    type GraphNode,
    type GraphLink,
    type GraphConfiguration,
    type NodeLabelProperty,
    type LinkLabelProperty
} from "react-d3-graph"
import type { BookData } from "@/typing";
import { useEffect, useRef } from "react";

interface ResultsViewProps {
    bookData: BookData;
    edgelessCharacters?: string[];
    charactersWithEdges?: string[];
    onBack: () => void;
}

export function ResultsView(props:ResultsViewProps){
    const {bookData, onBack, edgelessCharacters, charactersWithEdges} = props;
    const graphRef = useRef<any>(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
        if (graphRef.current) {
            graphRef.current.restartSimulation();
        }
        }, 1000);
        
        return () => clearTimeout(timeout);
    }, [bookData]);
    const graphConfig: Partial<GraphConfiguration<GraphNode, GraphLink>> = {
        node: {
            color: 'var(--secondary)',
            size: 500,
            highlightStrokeColor: 'blue',
            labelProperty: 'id' as NodeLabelProperty<GraphNode>,
        },
        link: {
            renderLabel: true,
            labelProperty: 'label' as LinkLabelProperty<GraphLink>,
        },
        directed: false,
        d3: {
            gravity: -150,
            linkLength: 100,
            alphaTarget: 0.05,
        },
        width: 500,
        height: 500,
    };

    return (
        <div className="w-full max-w-6xl flex flex-col flex-wrap gap-8 p-4">
            <button
                className="self-start px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 flex flex-row gap-4"
                onClick={onBack}
            >
                <ArrowLeft /> Back
            </button>
            <div className="flex flex-row gap-4 flex-wrap" style={{ minHeight: 400 }}>
                <div className="w-[550px] h-[550px] overflow-hidden border p-4 rounded shadow bg-white">
                    <h2 className="text-xl font-semibold mb-3">Character Interactions</h2>
                    <Graph ref={graphRef} id="graph-1" data={bookData} config={graphConfig} />
                </div>
                { charactersWithEdges &&
                    <div className="w-[550px] h-[550px] overflow-hidden border p-4 rounded shadow bg-white">
                        <div className="flex justify-between items-center mb-3 h-[28px]">
                            <h2 className="text-xl font-semibold">All Characters</h2>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-secondary inline-block"></span>
                                    <span>Has edges</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="w-3 h-3 rounded-full bg-muted inline-block"></span>
                                    <span>Edgeless</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-3 overflow-scroll max-h-[470px] items-centered">
                            {charactersWithEdges.map(name => (
                                <span key={name} className="bg-secondary px-3 py-1 rounded-full text-sm text-muted-foreground h-fit">
                                    {name}
                                </span>
                            ))}
                            {edgelessCharacters?.map(name => (
                                <span key={name} className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground h-fit">
                                    {name}
                                </span>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}