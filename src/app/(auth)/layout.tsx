import Image from "next/image"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row justify-between">
            <div className="w-full">
                {children}
            </div>
            <div className="min-w-[865px] max-w-[865px] max-h-screen overflow-hidden">
                <Image src='/pictures/auth-right.png' width={865} height={865} className="object-cover" alt="Image right" />
            </div>
        </div>
    )
}