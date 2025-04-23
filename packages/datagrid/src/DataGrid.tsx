import * as React from 'react';

// Types for columns, rows, and grid features
export interface DataGridColumn<T = any> {
  field: string;
  headerName: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  sortable?: boolean;
  filterable?: boolean;
  groupable?: boolean;
  pinnable?: boolean;
  hideable?: boolean;
  renderCell?: (params: { value: any; row: T; col: DataGridColumn<T> }) => React.ReactNode;
}

export interface DataGridRow {
  id: string | number;
  [key: string]: any;
}

export interface DataGridProps {
  columns: DataGridColumn[];
  rows: DataGridRow[];
  pageSize?: number;
  page?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  enableToolbar?: boolean;
  enablePagination?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

// Slot identifiers
const SLOT_TOOLBAR = 'DataGridToolbar';
const SLOT_PAGINATION = 'DataGridPagination';
const SLOT_FILTER_PANEL = 'DataGridFilterPanel';

// Slot components
export function ToolbarSlot(props: { children?: React.ReactNode }) {
  return <>{props.children}</>;
}
ToolbarSlot.displayName = SLOT_TOOLBAR;

export function PaginationSlot(props: { children?: React.ReactNode }) {
  return <>{props.children}</>;
}
PaginationSlot.displayName = SLOT_PAGINATION;

export function FilterPanelSlot(props: { children?: React.ReactNode }) {
  return <>{props.children}</>;
}
FilterPanelSlot.displayName = SLOT_FILTER_PANEL;

function getSlot<T = React.ReactElement>(children: React.ReactNode, slotName: string): T | undefined {
  let slot: T | undefined;
  React.Children.forEach(children, (child) => {
    if (
      React.isValidElement(child) &&
      (child.type as any).displayName === slotName
    ) {
      slot = child as T;
    }
  });
  return slot;
}

export const DataGrid: React.FC<DataGridProps> & {
  Toolbar: typeof ToolbarSlot;
  Pagination: typeof PaginationSlot;
  FilterPanel: typeof FilterPanelSlot;
} = ({
  columns,
  rows,
  pageSize = 25,
  page = 0,
  onPageChange,
  onPageSizeChange,
  enableToolbar = true,
  enablePagination = true,
  className,
  style,
  children,
}) => {
  // State for pagination (uncontrolled fallback)
  const [internalPage, setInternalPage] = React.useState(page);
  const [internalPageSize, setInternalPageSize] = React.useState(pageSize);

  // Find slots
  const toolbarSlot = getSlot(children, SLOT_TOOLBAR);
  const paginationSlot = getSlot(children, SLOT_PAGINATION);
  const filterPanelSlot = getSlot(children, SLOT_FILTER_PANEL);

  // Paginate rows
  const pagedRows = enablePagination
    ? rows.slice(
        (onPageChange ? page : internalPage) * (onPageSizeChange ? pageSize : internalPageSize),
        ((onPageChange ? page : internalPage) + 1) * (onPageSizeChange ? pageSize : internalPageSize)
      )
    : rows;

  return (
    <div role="grid" className={className} style={style}>
      {enableToolbar && toolbarSlot}
      <div role="rowgroup">
        <div role="row" style={{ display: 'flex' }}>
          {columns.map((col) => (
            <div key={col.field} role="columnheader" style={{ flex: col.width ? `0 0 ${col.width}px` : '1 1 0' }}>
              {col.headerName}
            </div>
          ))}
        </div>
        {pagedRows.map((row) => (
          <div key={row.id} role="row" style={{ display: 'flex' }}>
            {columns.map((col) => (
              <div key={col.field} role="gridcell" style={{ flex: col.width ? `0 0 ${col.width}px` : '1 1 0' }}>
                {col.renderCell ? col.renderCell({ value: row[col.field], row, col }) : row[col.field]}
              </div>
            ))}
          </div>
        ))}
      </div>
      {filterPanelSlot}
      {enablePagination && paginationSlot}
    </div>
  );
};

DataGrid.Toolbar = ToolbarSlot;
DataGrid.Pagination = PaginationSlot;
DataGrid.FilterPanel = FilterPanelSlot;
