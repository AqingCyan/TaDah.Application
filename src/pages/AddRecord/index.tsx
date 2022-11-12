import React, { useMemo, useState } from 'react'
import s from './index.module.less'

enum AmountType {
  paid = 0,
  earning = 1,
}

const MAX_COUNT = 100

const AddRecord = () => {
  const [amountType, setAmountType] = useState<AmountType>(1)
  const [descContent, setDescCount] = useState<string>('')

  const overMaxCount = useMemo(() => descContent.length >= 100, [descContent])

  return (
    <div className={s.pageContainer}>
      <section className={s.inputMoney}>
        <span className={s.icon}>¥</span>
        <input placeholder="请输入金额（必填）" type="number" pattern="\d*" />
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
