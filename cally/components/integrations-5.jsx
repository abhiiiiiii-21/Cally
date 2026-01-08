import { Gemini, Replit, MagicUI, VSCodium, MediaWiki, GooglePaLM } from '@/components/logos'
import { LogoIcon } from '@/components/logo'
import { cn } from '@/lib/utils'

export default function IntegrationsSection() {
    return (
        <section className="py-24">
            <div className="mx-auto max-w-5xl px-6">
                <div className="grid items-center gap-16 md:grid-cols-2">

                    {/* LEFT  */}
                    <div className="space-y-3 flex flex-col text-center">
                        <h1 className="text-balance text-5xl tracking-tight font-semibold">
                            Integrate with your favorite tools
                        </h1>
                        <p className="max-w-md text-neutral-600">
                            Connect seamlessly with popular platforms and services to enhance your workflow.
                        </p>
                    </div>

                    {/* RIGHT  */}
                    <div className="flex justify-center md:justify-end overflow-visible">

                        <div className="group relative h-[420px] w-[420px] overflow-visible">


                            {/* Outer spinning ring */}
                            <div
                                role="presentation"
                                className="bg-linear-to-b border-foreground/5 absolute inset-0 z-10 aspect-square animate-spin items-center justify-center rounded-full border-t from-lime-500/15 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100 dark:from-white/5"
                            />

                            {/* Inner spinning ring */}
                            <div
                                role="presentation"
                                className="bg-linear-to-b border-foreground/5 absolute inset-16 z-10 aspect-square scale-90 animate-spin rounded-full border-t from-blue-500/15 to-transparent to-25% opacity-0 duration-[3.5s] group-hover:opacity-100"
                            />

                            {/* Outer icons */}
                            <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-0 flex aspect-square items-center justify-center rounded-full border-t to-transparent to-25%">
                                <IntegrationCard className="-translate-x-1/6 absolute left-0 top-1/4 -translate-y-1/4">
                                    <Gemini />
                                </IntegrationCard>
                                <IntegrationCard className="absolute top-0 -translate-y-1/2">
                                    <Replit />
                                </IntegrationCard>
                                <IntegrationCard className="absolute right-0 top-1/4 -translate-y-1/4 translate-x-1/6">
                                    <MagicUI />
                                </IntegrationCard>
                            </div>

                            {/* Inner icons */}
                            <div className="bg-linear-to-b from-muted-foreground/15 absolute inset-16 flex aspect-square scale-90 items-center justify-center rounded-full border-t to-transparent to-25%">
                                <IntegrationCard className="absolute top-0 -translate-y-1/2">
                                    <VSCodium />
                                </IntegrationCard>
                                <IntegrationCard className="absolute left-0 top-1/4 -translate-x-1/4 -translate-y-1/4">
                                    <MediaWiki />
                                </IntegrationCard>
                                <IntegrationCard className="absolute right-0 top-1/4 translate-x-1/4 -translate-y-1/4">
                                    <GooglePaLM />
                                </IntegrationCard>
                            </div>

                            {/* Center logo */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="bg-muted relative z-20 rounded-full border p-1">
                                    <IntegrationCard
                                        className="size-16 border-black/20 dark:border-white/25 dark:shadow-white/15"
                                        isCenter
                                    >
                                        <LogoIcon className="text-blue-500" />
                                    </IntegrationCard>
                                </div>
                            </div>


                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

const IntegrationCard = ({ children, className, isCenter = false }) => {
    return (
        <div
            className={cn(
                'relative z-30 flex size-12 rounded-full border bg-white shadow-sm shadow-black/5 dark:bg-white/5 dark:backdrop-blur-md',
                className
            )}
        >
            <div className={cn('m-auto size-fit *:size-5', isCenter && '*:size-8')}>
                {children}
            </div>
        </div>
    )
}
