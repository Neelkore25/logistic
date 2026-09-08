import { ShipmentRecord } from '../types/export';
import { db } from './databaseService';

export const shipmentService = {
  /**
   * Fetch all shipments belonging to user
   */
  async getUserShipments(userId: string): Promise<ShipmentRecord[]> {
    return await db.shipments
      .where('userId')
      .equals(userId)
      .reverse()
      .sortBy('createdAt');
  },

  /**
   * Create a new shipment for user
   */
  async createShipment(userId: string, data: Partial<ShipmentRecord>): Promise<ShipmentRecord> {
    const trackingNo = `EXP-IN-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newShipment: ShipmentRecord = {
      id: `sh_${Date.now()}`,
      userId,
      trackingNumber: trackingNo,
      senderName: data.senderName || 'Exporter Facility',
      senderLocation: data.senderLocation || 'Maharashtra, India',
      receiverName: data.receiverName || 'Overseas Consignee',
      receiverCountry: data.receiverCountry || 'Germany',
      originPort: data.originPort || 'JNPT Nhava Sheva (INNSA), Mumbai',
      destinationPort: data.destinationPort || 'Port of Hamburg (DEHAM), Germany',
      productName: data.productName || 'Export Consignment Cargo',
      quantity: data.quantity || '1,000 kg',
      totalValueInr: data.totalValueInr || 500000,
      transportMode: data.transportMode || 'Ocean Freight',
      carrierName: data.carrierName || 'Maersk Line',
      vesselFlightNo: data.vesselFlightNo || 'Maersk Mc-Kinney Moller (Voyage 2609W)',
      containerNo: data.containerNo || `MSKU-${Math.floor(100000 + Math.random() * 900000)}-4`,
      status: 'created',
      currentMilestoneIndex: 0,
      departureDate: new Date().toLocaleDateString('en-IN'),
      estimatedArrival: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      insurancePolicyNo: `NIA-MAR-${Math.floor(10000 + Math.random() * 90000)}-2026`,
      insuranceCoverageInr: Math.round((data.totalValueInr || 500000) * 1.1),
      liveCoordinates: { lat: 18.9438, lng: 72.8258 },
      createdAt: new Date().toISOString(),
      milestones: [
        {
          id: 'm1',
          title: 'Shipment Created & Export Invoice Attached',
          location: 'Origin Processing Center',
          timestamp: 'Just now',
          completed: true,
          current: true,
          description: 'Commercial invoice and booking reference verified.'
        },
        {
          id: 'm2',
          title: 'Packaging & ISPM-15 Inspection Verified',
          location: 'Exporter Packhouse',
          timestamp: 'Pending Dispatch',
          completed: false,
          current: false,
          description: 'Palletized cartons and barrier vacuum seals cleared.'
        },
        {
          id: 'm3',
          title: 'Factory Gate Pickup & Road Transit',
          location: 'Highway Transit Corridor',
          timestamp: 'Scheduled',
          completed: false,
          current: false,
          description: 'Transport to port container terminal.'
        },
        {
          id: 'm4',
          title: 'Customs ICEGATE Clearance (Let Export Order)',
          location: 'JNPT Nhava Sheva Customs',
          timestamp: 'Pending Gate-In',
          completed: false,
          current: false,
          description: 'Shipping bill assessment and container seal inspection.'
        },
        {
          id: 'm5',
          title: 'Vessel Loaded & Departed Indian Waters',
          location: 'Arabian Sea Corridor',
          timestamp: 'Scheduled',
          completed: false,
          current: false,
          description: 'Ocean carrier departure toward transshipment port.'
        },
        {
          id: 'm6',
          title: 'Arrival at Destination Port & Import Clearance',
          location: 'Destination Port Terminal',
          timestamp: 'Expected in 20 days',
          completed: false,
          current: false,
          description: 'Customs quarantine and phytosanitary check.'
        },
        {
          id: 'm7',
          title: 'Final Mile Delivery to Receiver Warehouse',
          location: 'Receiver Facility',
          timestamp: 'Expected in 24 days',
          completed: false,
          current: false,
          description: 'Delivery order signed by buyer consignee.'
        }
      ]
    };

    await db.shipments.add(newShipment);
    return newShipment;
  },

  /**
   * Progress shipment milestone
   */
  async advanceMilestone(userId: string, shipmentId: string): Promise<ShipmentRecord> {
    const shipment = await db.shipments.get(shipmentId);
    if (!shipment || shipment.userId !== userId) {
      throw new Error('Shipment not found or access denied.');
    }

    const nextIdx = Math.min(shipment.milestones.length - 1, shipment.currentMilestoneIndex + 1);
    const updatedMilestones = shipment.milestones.map((m, idx) => ({
      ...m,
      completed: idx <= nextIdx,
      current: idx === nextIdx,
      timestamp: idx === nextIdx ? 'Updated just now' : m.timestamp
    }));

    const newStatus = nextIdx >= shipment.milestones.length - 1
      ? 'delivered'
      : nextIdx > 3
      ? 'in_transit'
      : nextIdx > 0
      ? 'dispatched'
      : 'created';

    const updated = {
      ...shipment,
      currentMilestoneIndex: nextIdx,
      status: newStatus as any,
      milestones: updatedMilestones
    };

    await db.shipments.put(updated);
    return updated;
  }
};
