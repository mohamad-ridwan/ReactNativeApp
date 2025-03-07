import { useCallback, useEffect, useMemo, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native"
import { Category, ProductsCategoriesT, ProductsData } from "../types/store/products/productsSlice"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { addProductsCategories } from "../store/products/productsSlice"
import { createSelector } from "reselect"
import { RootState } from "../store"
import { products, productsByCategory, productsCategories } from "../store/products/productAction"
import { HomeDataT } from "../types/sections/home"
import HeaderBar from "../components/header-bar"
import ListCategories from "../sections/categories/lists"
import CategoryCard from "../components/card/CategoryCard"
import ListPickCategories from "../components/list-pick-categories"
import ProductList from "../components/product-list"
import { categoriesData } from "../assets/data/categories"

const { categoriesScreenDataElement, productsByCSDataElement } = categoriesData

type Props = {
    slug?: string
    isFirstLoadAction?: boolean
}

export default function useCategories({ slug, isFirstLoadAction }: Props) {
    const [activeCategory, setActiveCategory] = useState<Category>(slug ? slug as Category : Category.All)
    const [loadingCategories, setLoadingProducts] = useState<boolean>(true)
    const [loadingProductsByCategory, setLoadingProductsByCategory] = useState<boolean>(true)
    const [productsCategory, setProductsCategory] = useState<ProductsData>()
    const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true)

    const productsCategoriesSlice: any = createSelector(
        [(state: RootState) => state.productsSlice],
        productSlice => {
            return productSlice.productsCategories
        }
    )
    const productsCategoriesState = useSelector(productsCategoriesSlice, shallowEqual) as ProductsCategoriesT[]

    const dispatch = useDispatch() as any
    const isFocused = useIsFocused()
    const navigation = useNavigation()

    const categoriesByScreenData = useMemo((): ProductsCategoriesT[] => {
        if (productsCategoriesState?.length > 0) {
            return productsCategoriesState.map((item) => ({
                ...item,
                img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=2559&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }))
        }
        return []
    }, [productsCategoriesState])

    const handleGetCategories = useCallback(async () => {
        const categories = await dispatch(productsCategories())
        if (categories.meta.requestStatus.rejected) {
            setLoadingProducts(false)
            return
        }
        dispatch(addProductsCategories([
            {
                slug: 'all',
                name: 'All',
                url: 'all'
            },
            ...categories.payload
        ]))
        setLoadingProducts(false)
    }, [])

    // GET PRODUCTS CATEGORIES
    useEffect(() => {
        handleGetCategories()
    }, [])

    const handleGetProductsByCategory = useCallback(async () => {
        setLoadingProductsByCategory(true)
        const productsData = (slug && isFirstLoad) ?
            await dispatch(productsByCategory(slug as Category)) :
            activeCategory === Category.All ?
                await dispatch(products())
                :
                await dispatch(productsByCategory(activeCategory))

        if (!isFocused || isFirstLoad) {
            if (isFirstLoadAction) {
                setLoadingProductsByCategory(false)
                return
            }
        }
        if (
            productsData.type === 'products/fulfilled' ||
            productsData.type === 'products-by-categories/fulfilled'
        ) {
            setProductsCategory(productsData.payload)
        }
        setLoadingProductsByCategory(false)
    }, [activeCategory, isFocused, slug])

    // GET PRODUCTS BY CATEGORY
    useEffect(() => {
        handleGetProductsByCategory()
    }, [activeCategory, isFirstLoad])

    const handlePickCategory = useCallback((type: Category) => {
        setActiveCategory(type)
    }, [])

    useEffect(() => {
        if (slug) {
            setIsFirstLoad(false)
            setActiveCategory(slug as Category)
        }
    }, [slug])

    // CATEGORIES IN HOME SCREEN
    const renderItem = useCallback(({ item }: { item: ProductsCategoriesT }) => {
        return (
            <CategoryCard
                image={item.img}
                name={item.name}
                isActive={activeCategory === item.slug}
                onPress={() => handlePickCategory(item.slug)}
            />
        )
    }, [activeCategory])

    const handleBackPress = useCallback((screenName: string) => {
        navigation.navigate(screenName as never)
    }, [])

    const handleNavigate = useCallback((...params: any) => {
        navigation.navigate(...params as never)
    }, [])

    // CATEGORIES SCREEN
    const renderItemCategoriesScreen = useCallback(({ item }: { item: HomeDataT }) => {
        if (item.sectionType === 'HEADER') {
            return (
                <HeaderBar headerName="Categories" onBackPress={(event) => handleBackPress('Home')} />
            )
        } else if (item.sectionType === 'CATEGORIES') {
            return (
                <ListCategories
                    productsCategoriesState={categoriesByScreenData}
                    handleNavigate={handleNavigate}
                />
            )
        }
        return null
    }, [categoriesByScreenData])

    // PRODUCTS BY CATEGORY SCREEN
    const renderItemProductsByCategories = useCallback(({ item }: { item: HomeDataT }) => {
        if (item.sectionType === 'HEADER') {
            return (
                <HeaderBar
                    headerName="Categories"
                    onBackPress={(event) => handleBackPress('Categories')}
                    centerBarType="search"
                    flexCenter={8}
                    flexRight={0}
                />
            )
        } else if (item.sectionType === 'CATEGORIES') {
            return (
                <ListPickCategories
                    productsCategories={categoriesByScreenData}
                    renderItem={renderItem}
                />
            )
        } else if (item.sectionType === 'LIST-PRODUCTS') {
            return (
                <ProductList
                    products={productsCategory as ProductsData}
                    containerMarginTop={10}
                />
            )
        }
        return null
    }, [categoriesByScreenData, productsCategory])

    return {
        renderItem,
        productsCategoriesState,
        loadingCategories,
        loadingProductsByCategory,
        renderItemCategoriesScreen,
        categoriesScreenDataElement,
        handleNavigate,
        productsByCSDataElement,
        renderItemProductsByCategories,
        categoriesByScreenData,
        isFocused,
        productsCategory
    }
}