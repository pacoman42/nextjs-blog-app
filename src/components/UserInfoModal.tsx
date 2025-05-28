import React from 'react';
import styles from '../styles/ui.module.css';

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    phone?: string;
    website?: string;
    address?: any;
    company?: any;
}

interface UserInfoModalProps {
    user: User;
    onClose: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ user, onClose }) => (
    <div className={styles.userInfoModalOverlay}>
        <div className={styles.userInfoModal}>
            <button className={styles.userInfoModalCloseBtn} onClick={onClose} aria-label="Close">&times;</button>
            <div className={styles.userInfoModalContent}>
                {/* Avatar */}
                <div className={styles.userInfoModalAvatarContainer}>
                    <div className={styles.userInfoModalAvatar}>
                        <svg className={styles.userInfoModalAvatarIcon} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 19.125a7.125 7.125 0 0114.248 0A17.933 17.933 0 0112 21c-2.676 0-5.216-.584-7.499-1.875z" /></svg>
                    </div>
                </div>
                {/* Main info + secondary info alineados arriba */}
                <div className={styles.userInfoModalMain}>
                    {/* Main info */}
                    <div className={styles.userInfoModalMainInfo}>
                        <div className={styles.userInfoModalName}>{user.name}</div>
                        <div className={styles.userInfoModalUsername}>@{user.username}</div>
                        <a href={`mailto:${user.email}`} className={styles.userInfoModalEmail}>{user.email}</a>
                        {user.phone && <div className={styles.userInfoModalPhone}>{user.phone}</div>}
                    </div>
                    {/* Secondary info alineado arriba */}
                    <div className={styles.userInfoModalSecondaryInfo}>
                        {user.company && (
                            <div className={styles.userInfoModalCompany}>
                                <span className={styles.userInfoModalCompanyLabel}>Company:</span>{' '}
                                <span className={styles.userInfoModalCompanyName}>{user.company.name || JSON.stringify(user.company)}</span>
                            </div>
                        )}
                        {user.address && (
                            <div className={styles.userInfoModalAddress}>
                                <span className={styles.userInfoModalAddressLabel}>Address:</span>{' '}
                                <span className={styles.userInfoModalAddressValue}>
                                    {user.address.street ? `${user.address.street}, ${user.address.city}` : JSON.stringify(user.address)}
                                </span>
                            </div>
                        )}
                        {user.website && (
                            <a
                                href={user.website.startsWith('http') ? user.website : `https://${user.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.userInfoModalWebsite}
                            >
                                {user.website}
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default UserInfoModal;
