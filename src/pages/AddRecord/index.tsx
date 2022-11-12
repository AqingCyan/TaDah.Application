import React, { useState } from 'react'
import s from './index.module.less'

enum AmountType {
  paid = 0,
  earning = 1,
}

const AddRecord = () => {
  const [amountType, setAmountType] = useState<AmountType>(1)

  return (
    <div className={s.pageContainer}>
      <section className={s.inputMoney}>
        <span className={s.icon}>¥</span>
        <input placeholder="请输入金额（必填）" />
      </section>
      <section className={s.amountType}>
        <button
          className={amountType === AmountType.paid ? s.notSelect : undefined}
          onClick={() => setAmountType(AmountType.earning)}
        >
          收入项
        </button>
        <button
          className={amountType === AmountType.earning ? s.notSelect : undefined}
          onClick={() => setAmountType(AmountType.paid)}
        >
          支出项
        </button>
      </section>

      <section className={s.describe}>
        <textarea className={s.describe} placeholder="请输入记帐描述（必填）" />
        <span className={s.count}>20/100</span>
      </section>
    </div>
  )
}

export default AddRecord
