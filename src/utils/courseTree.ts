import type { TreeDataNode } from "antd";

function filterNode(node: TreeDataNode, keyword: string): TreeDataNode | null {
  const title = String(node.title).toLowerCase();
  const selfMatch = title.includes(keyword);
  const filteredChildren = node.children
    ?.map((child) => filterNode(child, keyword))
    .filter((child): child is TreeDataNode => child !== null);

  if (selfMatch) {
    return { ...node, children: node.children };
  }

  if (filteredChildren && filteredChildren.length > 0) {
    return { ...node, children: filteredChildren };
  }

  return null;
}

export function filterCourseTree(nodes: TreeDataNode[], keyword: string): TreeDataNode[] {
  const trimmed = keyword.trim().toLowerCase();
  if (!trimmed) {
    return nodes;
  }

  return nodes
    .map((node) => filterNode(node, trimmed))
    .filter((node): node is TreeDataNode => node !== null);
}

export function collectTreeKeys(nodes: TreeDataNode[]): string[] {
  const keys: string[] = [];

  for (const node of nodes) {
    keys.push(String(node.key));
    if (node.children) {
      keys.push(...collectTreeKeys(node.children));
    }
  }

  return keys;
}

export function findLeafCourseKeys(nodes: TreeDataNode[]): string[] {
  const keys: string[] = [];

  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      keys.push(...findLeafCourseKeys(node.children));
    } else {
      keys.push(String(node.key));
    }
  }

  return keys;
}
