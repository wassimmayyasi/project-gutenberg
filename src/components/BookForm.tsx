import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  bookId: z.string().regex(/^\d{1,5}$/, {
    message: 'bookId must be between 1 and 5 digits.',
  }),
});

interface BookFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  loading: boolean;
  error?: string;
}

export function BookForm({ onSubmit, loading, error }: BookFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { bookId: "" },
  })

  return (
    <Form {...form}>
        <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="w-full max-w-[420px] mx-auto gap-4"
        >
            <FormField
                control={form.control}
                name="bookId"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>BookID</FormLabel>
                        <FormControl>
                            <div className="w-full max-w-[420px] mx-auto flex flex-row gap-2">
                                <Input placeholder="Enter book ID" {...field} disabled={loading} className="w-full"/>
                                <Button type="submit" disabled={loading}>
                                    {loading ? "Loading..." : "Analyze"}
                                </Button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {error && (
                <p className="text-red-600 text-sm">{error}</p>
            )}
        </form>
    </Form>
  )
}
