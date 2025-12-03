import { TabsPanel } from "@/components/ui/tabs";
import MeetingsTable from "../_components/MeetingsTable";

export default function Page() {
  return (
    <TabsPanel value="upcoming">
      <MeetingsTable status="upcoming" />
    </TabsPanel>
  );
}
