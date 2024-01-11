export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-row justify-between">
            <div className="w-full">
                {children}
            </div>
            <div className="min-w-[865px] max-w-[865px] max-h-screen overflow-hidden">
                <img src="/pictures/auth-right.png" className="object-cover" alt="" />
            </div>
        </div>
    )
}