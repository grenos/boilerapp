import React from 'react';
import {
    CustomIcon,
    CustomSafeArea,
    CustomScrollView,
    CustomStatusBar,
    CustomText,
    CustomView,
} from '~Components';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '~Storage/Redux';
import { createTodo, getTodo } from '~Storage/Redux/Actions';
import { selectTodo } from '~Storage/Redux/Selectors';
import { Constants } from '~Utils';
import {
    useinMemoryRealm,
    useOnDiskRealm,
    useinMemoryQuery,
    useOnDiskQuery,
    RMovie,
    RTodo,
} from '~Storage/Realm';
import { uniqueId } from 'lodash';

export const HomeScreen = () => {
    const dispatch = useAppDispatch();
    const realmMem = useinMemoryRealm();
    const realmDisk = useOnDiskRealm();

    const allMovies = useOnDiskQuery(RMovie);
    const allTodos = useinMemoryQuery(RTodo);

    // const Rmovie = useObject(RMovie, movieId.toString());
    // const todo = useAppSelector(selectTodo);
    // const { data, loading, error, isError } = useAppSelector(selectTodo);

    const addTodo = async () => {
        // dispatch(
        //     createTodo({
        //         endpoint: 'todos',
        //         todo: {
        //             completed: false,
        //             id: 999,
        //             title: 'delectus aut autem',
        //             userId: 999,
        //         },
        //     }),
        // );

        // dispatch(getTodo('todos/999'));

        try {
            realmMem.write(() => {
                // eslint-disable-next-line no-new
                new RTodo(realmMem, {
                    completed: false,
                    id: 999,
                    title: 'delectus aut autem',
                    userId: 999,
                });
            });
        } catch (_error) {
            console.log('Could not save todo to realm', _error);
        }
    };

    const saveToRealm = () => {
        try {
            let id = uniqueId('for movie ');
            realmDisk.write(() => {
                // eslint-disable-next-line no-new
                new RMovie(realmDisk, {
                    id,
                    title: `Random title ${id}`,
                });
            });
        } catch (_error) {
            console.log('Could not save movie to realm', _error);
        }
    };

    return (
        <CustomView
            container
            flex
            background="pink"
            justify="flex-start"
            pd={[10, 20, 10, 20]}>
            <CustomStatusBar translucent />
            <CustomSafeArea />

            <CustomText mg={[0, 20, 20, 20]} font="title">
                Step One
            </CustomText>

            <CustomIcon
                size={32}
                name={Constants.close}
                pressable
                action={() => console.log('Test')}
            />

            <TouchableOpacity onPress={saveToRealm} testID="toucheMeButton">
                <CustomText font="body">Add movie</CustomText>
            </TouchableOpacity>

            <TouchableOpacity onPress={addTodo}>
                <CustomText font="body">Add Todo</CustomText>
            </TouchableOpacity>

            <CustomView>
                <CustomText font="body">{allTodos[0]?.title}</CustomText>
            </CustomView>

            <CustomScrollView>
                {allMovies.map(movie => {
                    return (
                        <CustomText font="body" key={movie.id}>
                            {movie.title}
                        </CustomText>
                    );
                })}
            </CustomScrollView>
        </CustomView>
    );
};
