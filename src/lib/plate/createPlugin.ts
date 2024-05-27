import { createPlugins } from "@udecode/plate-common";
import { plugins } from "./plate-plugins";
import { withDraggables } from "../../components/plate-ui/with-draggables/with-draggables";
import { withPlaceholders } from "../../components/plate-ui/placeholder/placeholder";

interface NewPlugin {
  key: string;
  element: JSX.Element;
  plugin: () => any;
}

function createNewPlugins(new_Plugins: NewPlugin[]) {
  const placeholders = Object.fromEntries(
    new_Plugins.map((el) => [el.key, el.element])
  );

  const plugins_v2 = createPlugins(
    [...plugins, ...new_Plugins.map((el) => el.plugin())],
    {
      components: withDraggables(withPlaceholders(placeholders)),
    }
  );
  return plugins_v2;
}

export default createNewPlugins;
