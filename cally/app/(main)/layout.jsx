
import { AppSidebar } from "@/components/app-siderbar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast"
import HeaderBar from "@/components/HeaderBar"

export default function Layout({ children }) {
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <HeaderBar/>

        <main>
          <ToastProvider position="bottom-center">
            <AnchoredToastProvider>
              {children}
            </AnchoredToastProvider>
          </ToastProvider>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
