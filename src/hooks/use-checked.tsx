/* eslint-disable array-callback-return */
import {useEffect, useState, useMemo, useCallback} from 'react'

export interface UseCheckedResult<T> {
  toggleCheck: (id: string) => void
  toggleCheckAll: (isCheckedAll: boolean, memorize?: boolean) => void
  setDefaultChecked: (items: T[]) => void
  isCheckedAll: boolean
  listDataChecked: T[]
  checkedList: string[]
  listDataUnChecked: T[]
}

/**
 * @description Một React Hook tùy chỉnh cung cấp các chức năng để chọn và bỏ chọn các item trong một danh sách
 *
 * @param {T[]} data Danh sách các item để chọn hoặc bỏ chọn
 * @param {string[]} defaultIds Danh sách các id của các item được chọn mặc định
 * @returns {UseCheckedResult<T>} Một đối tượng chứa các phương thức và giá trị liên quan đến các item được chọn
 */ const useChecked = <T extends {id?: string}>(
  data?: T[],
  defaultIds?: string[]
): UseCheckedResult<T> => {
  // Gộp listDataChecked và unCheckedListData thành một state duy nhất
  const [checkedState, setCheckedState] = useState<{listDataChecked: T[]; listDataUnChecked: T[]}>({
    listDataChecked: [],
    listDataUnChecked: [],
  })
  const isCheckedAll = useMemo(() => {
    if (data?.length === 0) {
      return false
    } else {
      return (
        data?.every(
          (item) => checkedState.listDataChecked.findIndex((i) => i.id === item.id) !== -1
        ) ?? false
      )
    }
  }, [checkedState.listDataChecked, data])

  useEffect(() => {
    if (defaultIds) {
      defaultIds.forEach((id) => toggleCheck(id))
    }
  }, [defaultIds])

  /**
   * @description Một hàm để thay đổi trạng thái được chọn của một item theo id của nó
   *
   * @param {string} checkId Id của item cần thay đổi
   */
  const toggleCheck = useCallback(
    (checkId: string) => {
      // Tìm item có id checkId trong data
      const item = data?.find((item) => item.id === checkId)
      if (item !== undefined) {
        // Kiểm tra xem item đã được chọn hay chưa
        const checked = checkedState.listDataChecked.find((item) => item.id === checkId)
        if (checked !== undefined) {
          // Nếu đã được chọn, xóa item khỏi list checked và thêm vào list unchecked
          setCheckedState((prevState) => ({
            ...prevState,
            listDataChecked: prevState.listDataChecked.filter((item) => item.id !== checkId),
          }))
          setCheckedState((prevState) => ({
            ...prevState,
            listDataUnChecked: [...prevState.listDataUnChecked, item],
          }))
        } else {
          // Nếu chưa được chọn, xóa item khỏi list unchecked và thêm vào list checked
          setCheckedState((prevState) => ({
            ...prevState,
            listDataUnChecked: prevState.listDataUnChecked.filter((item) => item.id !== checkId),
          }))
          setCheckedState((prevState) => ({
            ...prevState,
            listDataChecked: [...prevState.listDataChecked, item],
          }))
        }
      } else {
        const checked = checkedState.listDataChecked.find((item) => item.id === checkId)
        if (checked !== undefined) {
          // Nếu đã được chọn, xóa item khỏi list checked và thêm vào list unchecked
          setCheckedState((prevState) => ({
            ...prevState,
            listDataChecked: prevState.listDataChecked.filter((item) => item.id !== checkId),
          }))
          setCheckedState((prevState) => ({
            ...prevState,
            listDataUnChecked: [...prevState.listDataUnChecked],
          }))
        } else {
          // Nếu chưa được chọn, xóa item khỏi list unchecked và thêm vào list checked
          setCheckedState((prevState) => ({
            ...prevState,
            listDataUnChecked: prevState.listDataUnChecked.filter((item) => item.id !== checkId),
          }))
          setCheckedState((prevState) => ({
            ...prevState,
            listDataChecked: [...prevState.listDataChecked],
          }))
        }
      }
    },
    [data, checkedState.listDataChecked]
  )

  /**
   * @description Một hàm để thay đổi trạng thái được chọn của tất cả các item trong danh sách
   *
   * @param {boolean} isCheckedAll Một giá trị boolean cho biết tất cả các item có được chọn hay không
   */
  const toggleCheckAll = useCallback(
    (isCheckedAll: boolean, memorize: boolean = false) => {
      setCheckedState((e) => {
        const ids = data?.reduce((obj, item) => {
          if (item.id) {
            obj[item.id] = true
          }
          return obj
        }, {} as {[key: string]: boolean})

        const newChecked = e.listDataChecked?.filter((c) => {
          if (c.id) {
            return !ids?.[c.id]
          }
        })

        const newUnChecked = e.listDataUnChecked?.filter((c) => {
          if (c.id) {
            return !ids?.[c.id]
          }
        })

        const memorizechecked = isCheckedAll ? newChecked.concat(data || []) || [] : newChecked

        const result = isCheckedAll ? newUnChecked : newUnChecked.concat(data || []) || []

        if (memorize) {
          return {listDataChecked: memorizechecked, listDataUnChecked: result}
        }

        return {listDataChecked: isCheckedAll ? data || [] : [], listDataUnChecked: result}
      })
    },
    [data]
  )

  /**
   * @description Một hàm để thiết lập các item được chọn mặc định trong danh sách
   *
   * @param {T[]} items Danh sách các item được chọn mặc định
   */
  const setDefaultChecked = useCallback((items: T[]) => {
    setCheckedState((e) => ({
      listDataChecked: items,
      listDataUnChecked: e.listDataUnChecked || [],
    }))
  }, [])

  const useCheckedResult = useMemo(
    () => ({
      toggleCheck,
      toggleCheckAll,
      setDefaultChecked,
      isCheckedAll,
      listDataChecked: checkedState.listDataChecked,
      listDataUnChecked: checkedState.listDataUnChecked,
      checkedList: checkedState.listDataChecked.map((e) => e.id ?? ''),
    }),
    [toggleCheck, toggleCheckAll, setDefaultChecked, isCheckedAll, checkedState]
  )
  return useCheckedResult
}

export default useChecked
