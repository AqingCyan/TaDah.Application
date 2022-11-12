import React, { useMemo, useState } from 'react'
import s from './index.module.less'
import Toast from '@/components/Toast'

enum AmountType {
  paid = 0,
  earning = 1,
}

const MAX_COUNT = 100

const AddRecord = () => {
  const [amountType, setAmountType] = useState<AmountType>(1)
  const [amountCountFen, setAmountCountFen] = useState<number>(0)
  const [descContent, setDescCount] = useState<string>('')

  const overMaxCount = useMemo(() => descContent.length >= 100, [descContent])

  const handleAmountCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (value === '') {
      setAmountCountFen(0)
      return
    }
    if (/^\d+(\.\d{1,2})?$/.test(value)) {
      if (value.length <= 10) {
        const result = parseFloat(value)
        if (result * 100 <= 21474836473) {
          setAmountCountFen(result * 100)
        } else {
          Toast.show('数额太大啦', { position: 'center' })
        }
      } else {
        Toast.show('数额太大啦', { position: 'center' })
      }
    }
  }

  return (
    <div className={s.pageContainer}>
      <section className={s.inputMoney}>
        <span className={s.icon}>¥</span>
        <input
          type="number"
          placeholder="请输入金额（必填）"
          onChange={handleAmountCountChange}
          value={amountCountFen <= 0 ? undefined : amountCountFen / 100}
        />
      </section>
      <section className={s.amountType}>
        <div
          className={amountType === AmountType.paid ? s.notSelect : undefined}
          onTouchStart={() => setAmountType(AmountType.earning)}
        >
          收入项
        </div>
        <div
          className={amountType === AmountType.earning ? s.notSelect : undefined}
          onTouchStart={() => setAmountType(AmountType.paid)}
        >
          支出项
        </div>
      </section>

      <section className={overMaxCount ? s.describeError : s.describe}>
        <textarea
          placeholder="请输入记帐描述（必填）"
          value={descContent}
          onChange={(e) => {
            if (e.target.value.length <= MAX_COUNT) {
              setDescCount(e.target.value)
            }
          }}
        />
        <span className={s.count}>{descContent.length}/100</span>
      </section>
    </div>
  )
}

export default AddRecord
