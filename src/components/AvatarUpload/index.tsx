import React, { ChangeEvent } from 'react'
import Toast from '@/components/Toast'
import { uploadHeadImage } from '@/services/user'
import s from './index.module.less'

interface AvatarUploadProps {
  disabled?: boolean
  avatarSrc: string
  setAvatarSrc: (val: string) => void
}

// TODO 看要不要做一个头像裁剪的功能
const AvatarUpload: React.FC<AvatarUploadProps> = (props) => {
  const { disabled = false, avatarSrc, setAvatarSrc } = props

  /**
   * 上传头像
   * @param e
   */
  const uploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileData = e.target.files[0]
      const formData = new FormData()
      formData.append('headimage', fileData)
      uploadHeadImage(formData).then((res) => {
        if (res.data) {
          setAvatarSrc(res.data)
        } else {
          Toast.show('头像上传失败')
        }
      })
    }
  }

  return (
    <div className={s.headerImageUpload}>
      {!disabled && <input type="file" accept="image/png,image/jpeg" onChange={uploadFile} />}
      {avatarSrc ? <img src={avatarSrc} alt="headimage" /> : <span>+</span>}
    </div>
  )
}

export default AvatarUpload
