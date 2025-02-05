import { useEffect, useMemo, useState } from "react"
import { ReqLoginUserT } from "../types/store/auth/authAction"
import { useDispatch } from "react-redux"
import { loginUser } from "../store/auth/authAction"
import { UserState } from "../types/store/auth/authSlice"
import { navigate } from "../navigation/RootNavigation"
import { BackHandler } from "react-native"

export function useLogin() {
    const [form, setForm] = useState<ReqLoginUserT>({
        username: '',
        password: '',
        expiresInMin: 30
    })
    const [errMsgInput, setErrMsgInput] = useState<ReqLoginUserT>({
        username: ' ',
        password: ' '
    })
    const [passwordActive, setPasswordActive] = useState<boolean>(false)
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false)

    const dispatch = useDispatch() as any

    useEffect(() => {
        const backAction = () => {
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction,
        );

        return () => backHandler.remove();
    }, [])

    function handleClickIcon(): void {
        setPasswordActive(!passwordActive)
    }

    function handleChangeInput(name: 'username' | 'password', value: string): void {
        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    function formValidation(err: ReqLoginUserT): ReqLoginUserT {
        const { username, password } = form
        if (!username || !username.trim()) {
            err.username = 'username required'
        }
        if (!password || !password.trim()) {
            err.password = 'password required'
        }
        return err
    }

    async function handleSubmit(): Promise<void> {
        setLoadingSubmit(true)
        if (Object.keys(formValidation({ username: ' ', password: ' ' } as ReqLoginUserT))?.length === 0) {
            setErrMsgInput(formValidation({ username: ' ', password: ' ' }))
            setLoadingSubmit(false)
            return
        }
        const result = await dispatch(loginUser(form))
        const { id } = result?.payload as UserState
        if (id) {
            navigate('Home')
            setLoadingSubmit(false)
            return
        }
        setErrMsgInput((prev) => ({
            ...prev,
            password: 'Account not registered'
        }))
        setLoadingSubmit(false)
    }

    const isDisableSubmit = useMemo(() => {
        return loadingSubmit || Object.keys(formValidation({} as ReqLoginUserT))?.length !== 0
    }, [errMsgInput, form, loadingSubmit])

    return {
        handleClickIcon,
        passwordActive,
        handleChangeInput,
        handleSubmit,
        errMsgInput,
        isDisableSubmit,
        loadingSubmit
    }
}