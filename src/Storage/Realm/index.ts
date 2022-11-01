import { createRealmContext } from '@realm/react';
import { RMovie, RTodo } from './Models';

const config = {
    path: 'onDisk.realm',
    deleteRealmIfMigrationNeeded:
        process.env.NODE_ENV === 'development' ? true : false,
    schema: [RMovie],
};

const configMemory = {
    path: 'inMemory.realm',
    inMemory: true,
    deleteRealmIfMigrationNeeded:
        process.env.NODE_ENV === 'development' ? true : false,
    schema: [RTodo],
};

process.env.NODE_ENV === 'development' &&
    console.log(
        '--- :: REALM PATH :: --- ',
        Realm.defaultPath.replace('/default.realm', ''),
    );

// export const realmContext = createRealmContext(config);
// export const realmContextMemory = createRealmContext(configMemory);

const {
    RealmProvider: OnDiskRealmProvider,
    useRealm: useOnDiskRealm,
    useObject: useOnDiskObject,
    useQuery: useOnDiskQuery,
} = createRealmContext(config);
const {
    RealmProvider: InMemoryRealmProvider,
    useRealm: useinMemoryRealm,
    useObject: useinMemoryObject,
    useQuery: useinMemoryQuery,
} = createRealmContext(configMemory);

export {
    RMovie,
    RTodo,
    OnDiskRealmProvider,
    useOnDiskRealm,
    useOnDiskObject,
    useOnDiskQuery,
    InMemoryRealmProvider,
    useinMemoryRealm,
    useinMemoryObject,
    useinMemoryQuery,
};
