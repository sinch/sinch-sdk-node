/**
 * A single or range of IP addresses.
 */
export interface IpRange {
  /** The ID of the IP range. */
  id?: string;
  /** A description of the IP range. */
  description?: string;
  /** The start of the IP range. */
  ipAddress?: string;
  /** A range, also known as a CIDR, represents the number of leading bits that define the network portion of an IP address in CIDR notation. The range is specified after a slash (/) at the end of the IP address. The remaining bits define specific hosts within the network. - 10.0.0.0/8: Represents all IP addresses from 10.0.0.0 to 10.255.255.255, allowing for over 16 million unique host addresses. - 172.16.0.0/16: Includes all IP addresses from 172.16.0.0 to 172.16.255.255, providing up to 65,536 unique host addresses. - 192.168.1.0/24: Encompasses all IP addresses from 192.168.1.0 to 192.168.1.255, offering 256 unique host addresses. - 192.168.1.0/32: Encompasses one ip address */
  range?: number;
  /** The time the call was created. */
  createTime?: Date;
  /** The time the call was updated. */
  updateTime?: Date | null;
  /** The ID of the project. */
  projectId?: string;
  /** The ID of the access control list. */
  accessControlListId?: string;
}
