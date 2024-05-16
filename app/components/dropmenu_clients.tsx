import { Dropdown } from "flowbite-react";

export function DropMenu() {
  return (
    <Dropdown label="Action" dismissOnClick={false}>
      <Dropdown.Item>Borrar todos</Dropdown.Item>
    </Dropdown>
  );
}
