package ca.hec.tenjin.api.jobs;

import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

/**
 * Quartz job to refresh the provided elements of a Tenjin Syllabus based on
 * the given provider and site id.
 *
 * @author Curtis van Osch
 *
 */
public interface GenerateCitationsReportJob extends Job {

    void execute(JobExecutionContext arg0) throws JobExecutionException;
}
