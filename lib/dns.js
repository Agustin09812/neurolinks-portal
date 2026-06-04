/**
 * DNS automation helper for Hostinger hPanel DNS API.
 */

/**
 * Creates/Updates multiple DNS records in Hostinger for the configured zone.
 * 
 * @param {Array<Object>} records Array of records to create.
 * @param {string} records[].name The record name (subdomain, e.g. "testdev-2" or "_railway-verify.testdev-2")
 * @param {string} records[].type The record type (e.g. "CNAME", "TXT")
 * @param {string} records[].content The record target value (e.g. "d05up1b0.up.railway.app" or "railway-verify=...")
 * @returns {Promise<boolean>} Resolves to true if successfully created, false otherwise.
 */
export async function createDnsRecords(records) {
  const token = process.env.HOSTINGER_API_TOKEN;
  const domain = process.env.HOSTINGER_DOMAIN || "clientesneurolinks.com";

  if (!token || token === "PLACEHOLDER_TOKEN") {
    console.warn(`[DNS] ⚠️ Hostinger API Token is not configured or is placeholder. Skipping DNS records creation.`);
    return false;
  }

  if (!records || records.length === 0) {
    console.log(`[DNS] No DNS records provided to create.`);
    return true;
  }

  console.log(`[DNS] Processing ${records.length} record(s) to create/update...`);

  try {
    // 1. Fetch existing records from Hostinger
    console.log(`[DNS] Fetching existing DNS records for domain "${domain}"...`);
    const getUrl = `https://developers.hostinger.com/api/dns/v1/zones/${domain}`;
    const getRes = await fetch(getUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!getRes.ok) {
      const text = await getRes.text();
      throw new Error(`Hostinger GET API returned HTTP ${getRes.status}: ${text}`);
    }

    const existingRecords = await getRes.json();

    // Helper to normalize DNS value (remove trailing dots, quotes, and trim/lowercase)
    const normalizeVal = (val) => {
      if (!val) return "";
      let normalized = val.trim().toLowerCase();
      // Remove double quotes at start and end
      if (normalized.startsWith('"') && normalized.endsWith('"')) {
        normalized = normalized.slice(1, -1);
      }
      // Remove trailing dot
      if (normalized.endsWith(".")) {
        normalized = normalized.slice(0, -1);
      }
      return normalized;
    };

    const recordsToDelete = [];
    const recordsToAdd = [];

    for (const record of records) {
      const normContent = normalizeVal(record.content);
      
      // Find matches in existing records
      const existing = existingRecords.filter(
        r => r.name === record.name && r.type === record.type
      );

      if (existing.length > 0) {
        // Check if any existing record has the exact same content
        const alreadyExists = existing.some(
          r => r.records?.some(subRec => normalizeVal(subRec.content) === normContent)
        );

        if (alreadyExists) {
          console.log(`[DNS] Record "${record.name}" (${record.type}) already exists with correct value. Skipping.`);
        } else {
          console.log(`[DNS] Record "${record.name}" (${record.type}) exists but with different value. Marking for deletion.`);
          recordsToDelete.push({
            name: record.name,
            type: record.type
          });
          recordsToAdd.push(record);
        }
      } else {
        console.log(`[DNS] Record "${record.name}" (${record.type}) does not exist. Marking to add.`);
        recordsToAdd.push(record);
      }
    }

    // 2. Delete conflicts if any
    if (recordsToDelete.length > 0) {
      console.log(`[DNS] Deleting conflicting records:`, JSON.stringify(recordsToDelete));
      const deleteUrl = `https://developers.hostinger.com/api/dns/v1/zones/${domain}`;
      const delRes = await fetch(deleteUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          filters: recordsToDelete
        })
      });

      if (!delRes.ok) {
        const text = await delRes.text();
        throw new Error(`Hostinger DELETE API returned HTTP ${delRes.status}: ${text}`);
      }

      const delData = await delRes.json();
      console.log(`[DNS] ✅ Deleted conflicting records successfully. Response:`, delData);
    }

    // 3. Put new/updated records if any
    if (recordsToAdd.length > 0) {
      console.log(`[DNS] Adding/Updating records:`, JSON.stringify(recordsToAdd));
      const zoneRecords = recordsToAdd.map(rec => ({
        name: rec.name,
        type: rec.type,
        records: [
          {
            content: rec.content
          }
        ],
        ttl: 3600
      }));

      const putRes = await fetch(getUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          overwrite: false,
          zone: zoneRecords
        })
      });

      if (!putRes.ok) {
        const text = await putRes.text();
        throw new Error(`Hostinger PUT API returned HTTP ${putRes.status}: ${text}`);
      }

      const putData = await putRes.json();
      console.log(`[DNS] ✅ Added/Updated DNS records successfully. Response:`, putData);
    } else {
      console.log(`[DNS] All DNS records are already up to date. No PUT operation needed.`);
    }

    return true;
  } catch (error) {
    console.error(`[DNS] ❌ Error creating DNS records:`, error.message);
    return false;
  }
}

/**
 * Creates a CNAME record in Hostinger for the given subdomain (slug).
 * 
 * @param {Object} params
 * @param {string} params.slug The subdomain to create (e.g. "testdev-2")
 * @param {string} params.requiredValue The target value (e.g. "d05up1b0.up.railway.app")
 * @returns {Promise<boolean>} Resolves to true if successfully created, false otherwise.
 */
export async function createCnameRecord({ slug, requiredValue }) {
  return createDnsRecords([{ name: slug, type: "CNAME", content: requiredValue }]);
}

