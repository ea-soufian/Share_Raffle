import {
    Page,
    AlphaCard,
    IndexFilters,
    ChoiceList,
    IndexTable,
    Badge,
} from '@shopify/polaris';
import React, { useState, useCallback } from 'react';


function resourceIndexDefault() {
    function disambiguateLabel(key, value) {
        switch (key) {
        case 'type':
            return value.map((val) => `type: ${val}`).join(', ');
        case 'status':
            return value.map((val) => `status: ${val}`).join(', ');
        default:
            return value;
        }
    }

    function isEmpty(value) {
        if (Array.isArray(value)) {
        return value.length === 0;
        } else {
        return value === '' || value == null;
        }
    }

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const [itemStrings, setItemStrings] = useState([
        'All',
        'Active',
        'Draft',
        'Archived',
    ]);

    const deleteView = (index) => {
        const newItemStrings = [...itemStrings];
        newItemStrings.splice(index, 1);
        setItemStrings(newItemStrings);
        setSelected(0);
    };

    const duplicateView = async (name) => {
        setItemStrings([...itemStrings, name]);
        setSelected(itemStrings.length);
        await sleep(1);
        return true;
    };

    const tabs = itemStrings.map((item, index) => ({
        content: item,
        index,
        onAction: () => {},
        id: `${item}-${index}`,
        isLocked: index === 0,
        actions:
        index === 0
            ? []
            : [
                {
                type: 'rename',
                onAction: () => {},
                onPrimaryAction: async (value) => {
                    const newItemsStrings = tabs.map((item, idx) => {
                    if (idx === index) {
                        return value;
                    }
                    return item.content;
                    });
                    await sleep(1);
                    setItemStrings(newItemsStrings);
                    return true;
                },
                },
                {
                type: 'duplicate',
                onPrimaryAction: async (name) => {
                    await sleep(1);
                    duplicateView(name);
                    return true;
                },
                },
                {
                type: 'edit',
                },
                {
                type: 'delete',
                onPrimaryAction: async () => {
                    await sleep(1);
                    deleteView(index);
                    return true;
                },
                },
            ],
    }));

    const [selected, setSelected] = useState(0);

    const onCreateNewView = async (value) => {
        await sleep(500);
        setItemStrings([...itemStrings, value]);
        setSelected(itemStrings.length);
        return true;
    };

    const sortOptions = [
        { label: 'Product', value: 'product asc', directionLabel: 'Ascending' },
        { label: 'Product', value: 'product desc', directionLabel: 'Descending' },
        { label: 'Status', value: 'status asc', directionLabel: 'A-Z' },
        { label: 'Status', value: 'status desc', directionLabel: 'Z-A' },
        { label: 'Type', value: 'type asc', directionLabel: 'A-Z' },
        { label: 'Type', value: 'type desc', directionLabel: 'Z-A' },
        { label: 'Vendor', value: 'vendor asc', directionLabel: 'Ascending' },
        { label: 'Vendor', value: 'vendor desc', directionLabel: 'Descending' },
    ];

    const [sortSelected, setSortSelected] = useState(['product asc']);
    const { mode, setMode } = useSetIndexFiltersMode();
    const onHandleCancel = () => {};
    const onHandleSave = async () => {
        await sleep(1);
        return true;
    };

    const primaryAction =
        selected === 0
        ? {
            type: 'save-as',
            onAction: onCreateNewView,
            disabled: false,
            loading: false,
            }
        : {
            type: 'save',
            onAction: onHandleSave,
            disabled: false,
            loading: false,
            };

    const [status, setStatus] = useState(undefined);
    const [type, setType] = useState(undefined);
    const [queryValue, setQueryValue] = useState('');

    const handleStatusChange = useCallback((value) => setStatus(value), []);
    const handleTypeChange = useCallback((value) => setType(value), []);
    const handleFiltersQueryChange = useCallback(
        (value) => setQueryValue(value),
        []
    );
    const handleStatusRemove = useCallback(() => setStatus(undefined), []);
    const handleTypeRemove = useCallback(() => setType(undefined), []);
    const handleQueryValueRemove = useCallback(() => setQueryValue(''), []);
    const handleFiltersClearAll = useCallback(() => {
        handleStatusRemove();
        handleTypeRemove();
        handleQueryValueRemove();
    }, [handleStatusRemove, handleQueryValueRemove, handleTypeRemove]);

    const filters = [
        {
        key: 'status',
        label: 'Status',
        filter: (
            <ChoiceList
            title="status"
            titleHidden
            choices={[
                { label: 'Active', value: 'active' },
                { label: 'Draft', value: 'draft' },
                { label: 'Archived', value: 'archived' },
            ]}
            selected={status || []}
            onChange={handleStatusChange}
            allowMultiple
            />
        ),
        shortcut: true,
        },
        {
        key: 'type',
        label: 'Type',
        filter: (
            <ChoiceList
            title="Type"
            titleHidden
            choices={[
                { label: 'Brew Gear', value: 'brew-gear' },
                { label: 'Brew Merch', value: 'brew-merch' },
            ]}
            selected={type || []}
            onChange={handleTypeChange}
            allowMultiple
            />
        ),
        shortcut: true,
        },
    ];

    const appliedFilters = [];
    if (status && !isEmpty(status)) {
        const key = 'status';
        appliedFilters.push({
        key,
        label: disambiguateLabel(key, status),
        onRemove: handleStatusRemove,
        });
    }
    if (type && !isEmpty(type)) {
        const key = 'type';
        appliedFilters.push({
        key,
        label: disambiguateLabel(key, type),
        onRemove: handleTypeRemove,
        });
    }

    const products = [
        {
        id: '1020',
        price: '$200',
        product: '1ZPRESSO | J-MAX Manual Coffee Grinder',
        status: <Badge status="success">Active</Badge>,
        inventory: '20 in stock',
        type: 'Brew Gear',
        vendor: 'Espresso Shot Coffee',
        },
        {
        id: '1018',
        price: '$200',
        product: 'Acaia Pearl Set',
        status: <Badge status="success">Active</Badge>,
        inventory: '2 in stock for 50 variants',
        type: 'Brew Gear',
        vendor: 'Espresso Shot Coffee',
        },
        {
        id: '1016',
        price:

    '$200',
        product: 'AeroPress Go Brewer',
        status: <Badge status="info">Draft</Badge>,
        inventory: '3 in stock for 50 variants',
        type: 'Brew Gear',
        vendor: 'Espresso Shot Coffee',
        },
        {
        id: '1015',
        price: '200',
        product: 'Canadiano Brewer',
        status: <Badge status="success">Active</Badge>,
        inventory: '890 in stock for 50 variants',
        type: 'Brew Merch',
        vendor: 'Espresso Shot Coffee',
        },
        {
        id: '1014',
        price: '200',
        product: 'Canadiano Brewer White Ash',
        status: <Badge status="success">Active</Badge>,
        inventory: '890 in stock for 50 variants',
        type: 'Brew Gear',
        vendor: 'Espresso Shot Coffee',
        },
    ];

    const resourceName = {
        singular: 'product',
        plural: 'products',
    };

    const { selectedResources, allResourcesSelected, handleSelectionChange } =
        useIndexResourceState(products);

    const rowMarkup = products.map(
        ({ id, thumbnail, product, price, status, inventory, type, vendor }, index) => (
        <IndexTable.Row
            id={id}
            key={id}
            selected={selectedResources.includes(id)}
            position={index}
        >
            <IndexTable.Cell>
            <img
                src={'https://picsum.photos/50?random=' + String(index)}
                alt={'product thumbnail' + product}
            />
            </IndexTable.Cell>
            <IndexTable.Cell>{product}</IndexTable.Cell>
            <IndexTable.Cell>{price}</IndexTable.Cell>
            <IndexTable.Cell>{status}</IndexTable.Cell>
            <IndexTable.Cell>{inventory}</IndexTable.Cell>
            <IndexTable.Cell>{type}</IndexTable.Cell>
            <IndexTable.Cell>{vendor}</IndexTable.Cell>
        </IndexTable.Row>
        )
    );

    return (
        <Page
        title={'Products'}
        primaryAction={{ content: 'Add product' }}
        secondaryActions={[
            {
            content: 'Export',
            accessibilityLabel: 'Export product list',
            onAction: () => alert('Export action'),
            },
            {
            content: 'Import',
            accessibilityLabel: 'Import product list',
            onAction: () => alert('Import action'),
            },
        ]}
        >
        <AlphaCard padding="0">
            <IndexFilters
            sortOptions={sortOptions}
            sortValue={sortSelected}
            queryValue={queryValue}
            queryPlaceholder="Searching in all"
            onQueryChange={handleFiltersQueryChange}
            onQueryClear={() => {}}
            onSortChange={setSortSelected}
            primaryAction={primaryAction}
            cancelAction={{
                content: 'Cancel',
                onAction: onHandleCancel,
                disabled: false,
                loading: false,
            }}
            tabs={tabs}
            selectedTab={selected}
            onSelectTab={setSelected}
            canCreateNewView
            onCreateNewView={onCreateNewView}
            filters={filters}
            appliedFilters={appliedFilters}
            onClearAll={handleFiltersClearAll}
            mode={mode}
            setMode={setMode}
            />
            <IndexTable
            resourceName={resourceName}
            itemCount={products.length}
            selectedItemsCount={allResourcesSelected ? 'All' : selectedResources.length}
            onSelectionChange={handleSelectionChange}
            sortable={[false, true, true, true, true, true, true]}
            headings={[
                { title: '' },
                { title: 'Product' },


                { title: 'Price' },
                { title: 'Status' },
                { title: 'Inventory' },
                { title: 'Type' },
                { title: 'Vendor' },
            ]}
            >
            {rowMarkup}
            </IndexTable>
        </AlphaCard>
        </Page>
    );
}

export default resourceIndexDefault;
