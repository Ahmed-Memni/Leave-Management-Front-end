import { useMemo, useEffect, useState, ReactElement } from 'react';
import {
  Stack,
  Avatar,
  Tooltip,
  Typography,
  CircularProgress,
  Drawer,
  IconButton,
} from '@mui/material';
import {
  GridApi,
  DataGrid,
  GridSlots,
  GridColDef,
  useGridApiRef,
 /*  GridActionsCellItem, */
  GridRenderCellParams,
  GridTreeNodeWithRender,
  GridActionsCellItem,
} from '@mui/x-data-grid';
import { rows as initialRows } from 'data/customer-data'; // Import rows from customer-data.ts
import { stringAvatar } from 'helpers/string-avatar';
import IconifyIcon from 'components/base/IconifyIcon';
import CustomPagination from 'components/common/Pagination';
import CustomNoResultsOverlay from 'components/common/Noresults';
import UserProfileForm from 'components/Editprofile/editprofile';

const CustomerTable = ({ searchText }: { searchText: string }): ReactElement => {
  const apiRef = useGridApiRef<GridApi>();
  const [rows,  setRows ] = useState(initialRows); // Initialize state with imported rows
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleOpenEdit = () => setOpenDrawer(true);
  const handleCloseEdit = () => setOpenDrawer(false);

  // Delete function to simulate deleting the row
  const handleDelete = (id: number) => {
    // Here, we're simulating the delete action by updating the state
    const updatedRows = initialRows.filter((row) => row.id !== id); // This simulates removing from "data"
    setRows(updatedRows); // Update the state to reflect this in the table
  }; 

  const columns: GridColDef<any>[] = [
    {
      field: 'id',
      headerName: 'ID',
      resizable: false,
      minWidth: 60,
    },
    {
      field: 'name',
      headerName: 'Name',
      valueGetter: (params: any) => params,
      renderCell: (params: GridRenderCellParams<any, any, any, GridTreeNodeWithRender>) => (
        <Stack direction="row" gap={1} alignItems="center">
          <Tooltip title={params.row.name} placement="top" arrow>
            <Avatar {...stringAvatar(params.row.name)} />
          </Tooltip>
          <Typography variant="body2">{params.row.name}</Typography>
        </Stack>
      ),
      resizable: false,
      flex: 1,
      minWidth: 155,
    },
    {
      field: 'email',
      headerName: 'Email',
      resizable: false,
      flex: 0.5,
      minWidth: 145,
    },
    {
      field: 'phone',
      headerName: 'Phone',
      resizable: false,
      flex: 1,
      minWidth: 115,
    },
    {
      field: 'billing-address',
      headerName: 'Abscenses',
      sortable: false,
      resizable: false,
      flex: 1,
      minWidth: 250,
    },
    {
      field: 'total-spent',
      headerName: 'Make up Sessions',
      resizable: false,
      sortable: false,
      align: 'right',
      headerAlign: 'right',
      flex: 1,
      minWidth: 80,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      resizable: false,
      flex: 1,
      minWidth: 80,
      getActions: (params) => [
        <Tooltip title="Edit" key="edit">
          <GridActionsCellItem
            icon={
              <IconifyIcon
                icon="fluent:edit-32-filled"
                color="text.secondary"
                sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
              />
            }
            label="Edit"
            size="small"
            onClick={handleOpenEdit}
          />
        </Tooltip>,
        <Tooltip title="Delete" key="delete">
          <GridActionsCellItem
            icon={
              <IconifyIcon
                icon="mingcute:delete-3-fill"
                color="error.main"
                sx={{ fontSize: 'body1.fontSize', pointerEvents: 'none' }}
              />
            }
            label="Delete"
            size="small"
            onClick={() => handleDelete(params.row.id)} // Call handleDelete on click
          />
        </Tooltip>,
      ],
    },
  ];

  const visibleColumns = useMemo(
    () => columns.filter((column) => column.field !== 'id'),
    [columns],
  );

  useEffect(() => {
    apiRef.current.setQuickFilterValues(
      searchText.split(/\b\W+\b/).filter((word: string) => word !== ''),
    );
  }, [searchText]);

  useEffect(() => {
    const handleResize = () => {
      if (apiRef.current) {
        apiRef.current.resize();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [apiRef]);

  return (
    <>
      <DataGrid
        apiRef={apiRef}
        density="standard"
        columns={visibleColumns}
        autoHeight={false}
        rowHeight={56}
        checkboxSelection
        disableColumnMenu
        disableRowSelectionOnClick
        rows={rows} // Pass rows from state
        onResize={() => {
          apiRef.current.autosizeColumns({
            includeOutliers: true,
            expand: true,
          });
        }}
        initialState={{
          pagination: { paginationModel: { page: 0, pageSize: 4 } },
        }}
        slots={{
          loadingOverlay: CircularProgress as GridSlots['loadingOverlay'],
          pagination: CustomPagination as GridSlots['pagination'],
          noResultsOverlay: CustomNoResultsOverlay as GridSlots['noResultsOverlay'],
        }}
        slotProps={{
          pagination: { labelRowsPerPage: rows.length },
        }}
        sx={{
          height: 1,
          width: 1,
          tableLayout: 'fixed',
          scrollbarWidth: 'thin',
        }}
      />

      {/* Drawer (popout) for User Profile Edit */}
      <Drawer anchor="right" open={openDrawer} onClose={handleCloseEdit}>
        <div style={{ width: 400, padding: 20 }}>
          <IconButton onClick={handleCloseEdit} style={{ float: 'right' }}>
            <IconifyIcon icon="mdi:close" />
          </IconButton>
          <UserProfileForm />
        </div>
      </Drawer>
    </>
  );
};

export default CustomerTable;
