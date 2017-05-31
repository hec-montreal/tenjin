package ca.hec.tenjin.api.model.data;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.sakaiproject.content.api.ContentEntity;
import org.sakaiproject.time.api.Time;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class EntityContent {
	@JsonProperty
	private String name;
	@JsonProperty
	private String resourceId;
	@JsonProperty
	private String reference;
	@JsonProperty
	private String type;
	@JsonProperty
	private String mimeType;
	@JsonProperty
	private String description;
	@JsonProperty
	private String creator;
	@JsonProperty
	private String modifiedBy;
	@JsonProperty
	private String size;
	@JsonProperty
	private String url;
	@JsonProperty
	private String priority;
	@JsonProperty
	private Boolean publicAccess;
	@JsonProperty
	private Boolean copyright;

	@JsonProperty
	private Time created;
	@JsonProperty
	private Time modified;
	@JsonProperty
	private Time release;
	@JsonProperty
	private Time retract;

	@JsonProperty
	private boolean hidden;

	@JsonProperty
	private Collection<EntityContent> resourceChildren = new ArrayList<EntityContent>();

	@JsonProperty
	private Map<String, Object> properties = new HashMap<String, Object>();

	@JsonProperty
	private List<String> sections;

	@JsonIgnore
	private ContentEntity originalEntity;

	public EntityContent() {
		this.sections = new ArrayList<>();
	}

	public void addResourceChild(EntityContent child) {
		this.resourceChildren.add(child);
	}

	public Map<String, Object> getProperties() {
		return properties;
	}

	public void setProperty(String key, Object value) {
		properties.put(key, value);
	}

	public boolean after(Time timeStamp) {
		if (modified.after(timeStamp)) {
			return true;
		}
		return false;
	}
}
