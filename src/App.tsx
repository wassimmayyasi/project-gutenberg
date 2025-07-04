import { useState } from "react"
import type { BookData, Node } from "./typing"
import { BookForm } from "./components/BookForm"
import { LoadingScreen } from "./components/LoadingScreen"
import { ResultsView } from "./components/ResultsView"

function App() {
  // appState: form, loading, results
    const [appState, setAppState] = useState<'form' | 'loading' | 'results'>('form');
    const [error, setError] = useState<string | undefined>(undefined);
    const [bookData, setBookData] = useState<BookData | undefined>(undefined);
    const [edgelessCharacters, setEdgelessCharacters] = useState(undefined);
    const [charactersWithEdges, setCharactersWithEdges] = useState(undefined);

    async function handleSubmit(values: { bookId: string }) {
        setAppState('loading')
        setError(undefined)

        try {
            // Fetch first graph data
            const API_URL = import.meta.env.VITE_API_URL;
            const res = await fetch(`${API_URL}/get_book_analysis?book_id=${values.bookId}`)
            if (!res.ok) throw new Error('Failed to load graph 1 data')
            const data = await res.json()
            const result = data.result
            setBookData({
                nodes: result.nodes_with_edges,
                links: result.edges,
            })
            setEdgelessCharacters(result.nodes_without_edges.map((node : Node) => node.id));
            setCharactersWithEdges(result.nodes_with_edges.map((node : Node) => node.id));
            setAppState('results');
        } catch (err: any) {
            setError(err.message || 'Unknown error occurred')
            setAppState('form')
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            {appState === 'form' && (
                <div className="w-full max-w-2xl mx-auto px-4 py-12">
                    <h1 className="text-3xl font-semibold text-center text-primary mb-2">
                        Project Gutenberg Book Analyzer
                    </h1>
                    <p className="text-base text-center text-muted-foreground mb-6">
                        Enter the eBook ID of any title from{' '}
                        <a
                            href="https://www.gutenberg.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#aa873b] underline text-[1.05rem] font-medium"
                        >
                            Project Gutenberg
                        </a>{' '}
                        and I’ll fetch insights and key details for you.
                    </p>
                    <BookForm onSubmit={handleSubmit} loading={false} error={error} />
                </div>
            )}

            {appState === 'loading' && <LoadingScreen />}

            {appState === 'results' && bookData && edgelessCharacters && (
                <ResultsView
                    bookData={bookData}
                    onBack={() => {
                        setAppState('form')
                        setBookData(undefined)
                        setError(undefined)
                    }}
                    edgelessCharacters={edgelessCharacters}
                    charactersWithEdges={charactersWithEdges}
                />
            )}
        </div>
    )
}

export default App