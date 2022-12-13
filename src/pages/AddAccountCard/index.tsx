import React, { Dispatch, SetStateAction, useMemo, useState } from 'react'
import { history } from 'umi'
import TopInfo from '@/components/TopInfo'
import FormInput from '@/components/FormInput'
import Toast from '@/components/Toast'
import dayjs from 'dayjs'
import { setMonthData } from '@/services/tally'
import { tadah } from '@/utils/helpers'
import s from './index.module.less'

const AddAccountCard = () => {
  const [target, setTarget] = useState<number>(0)
  const [income, setIncome] = useState<number>(0)

  const overBiggestTargetFen = useMemo(() => target >= 5000000, [target])
  const overBiggestIncomeFen = useMemo(() => income >= 5000000, [income])

  const handleFenChange = (e: React.ChangeEvent<HTMLInputElement>, setCount: Dispatch<SetStateAction<number>>) => {
    const { value } = e.target
    if (value === '') {
      setCount(0)
      return
    }
    if (/^\d+?$/.test(value) && value.length <= 7) {
      setCount(parseInt(value))
    }
  }

  return (
    <div className={s.pageContainer}>
      <div>
        <TopInfo text="月度资金信息" />
        <h1 className={s.title}>{dayjs().format('YYYY年MM月')}资金信息</h1>
        <FormInput
          icon={<>¥</>}
          type="number"
          placeholder="请输入本月收入（整数）"
          errorText="数额太大（低于5000000）"
          errorStatus={overBiggestIncomeFen}
          value={income <= 0 ? undefined : income}
          onChange={(e) => handleFenChange(e, setIncome)}
        />
        <FormInput
          icon={<>¥</>}
          type="number"
          errorText="数额太大（低于5000000）"
          errorStatus={overBiggestTargetFen}
          value={target <= 0 ? undefined : target}
          placeholder="请输入本月计划开支（整数）"
          onChange={(e) => handleFenChange(e, setTarget)}
        />
      </div>
      <button
        onClick={() => {
          if (overBiggestTargetFen || overBiggestIncomeFen) {
            Toast.show('金额存在问题')
            return
          }
          if (Boolean(income) && Boolean(target)) {
            setMonthData(income, target).then((res) => {
              if (res.data) {
                history.push('/accountBook')
                tadah()
              }
            })
          } else {
            Toast.show('金额存在问题')
          }
        }}
      >
        确定设置
      </button>
    </div>
  )
}

export default AddAccountCard
