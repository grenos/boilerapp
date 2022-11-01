import React, { useEffect } from 'react';
import {
    CustomIcon,
    CustomSafeArea,
    CustomScrollView,
    CustomStatusBar,
    CustomText,
    CustomView,
} from '~Components';
import { TouchableOpacity } from 'react-native';
import { useAppDispatch } from '~Storage/Redux';
// import { createTodo, getTodo, getTodos } from '~Storage/Redux/Actions';
// import { selectTodo, selectTodos } from '~Storage/Redux/Selectors';
import { Constants } from '~Utils';
import { realmContext, RMovie } from '~Storage/Realm';
import { uniqueId } from 'lodash';
const { useRealm, useQuery } = realmContext;

export const HomeScreen = () => {
    const dispatch = useAppDispatch();
    const realm = useRealm();

    const allMovies = useQuery(RMovie);
    // const Rmovie = useObject(RMovie, movieId.toString());

    // const todo = useAppSelector(selectTodo);
    // const todos = useAppSelector(selectTodos);

    // console.log('todo--------', todo);
    // console.log('todos', todos);

    useEffect(() => {
        // dispatch(getTodo('todos/999'));
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
        // dispatch(getTodos('todos'));
    }, [dispatch]);

    const saveToRealm = () => {
        try {
            let id = uniqueId();
            realm.write(() => {
                // eslint-disable-next-line no-new
                new RMovie(realm, {
                    id,
                    title: `Random title ${id}`,
                });
            });
        } catch (error) {
            console.log('Could not save movie to realm', error);
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
